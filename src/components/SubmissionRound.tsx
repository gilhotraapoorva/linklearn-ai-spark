import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { 
  Upload, 
  FileText, 
  Github, 
  CheckCircle, 
  Clock,
  Code,
  Target,
  Award,
  X,
  ExternalLink,
  Calendar
} from 'lucide-react';

interface SubmissionData {
  projectTitle: string;
  description: string;
  techStack: string;
  githubUrl?: string;
  demoUrl?: string;
  submissionDate: string;
}

interface ProjectDetails {
  title: string;
  description: string;
  githubUrl: string;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export default function SubmissionRound() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    title: '',
    description: '',
    githubUrl: ''
  });
  const [techStack, setTechStack] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);

  // Check if user has already submitted and load submission data
  React.useEffect(() => {
    const submissionKey = `hackathon_submitted_${id}`;
    const submissionDataKey = `hackathon_submission_data_${id}`;
    
    if (localStorage.getItem(submissionKey) === 'true') {
      setSubmitted(true);
      const savedData = localStorage.getItem(submissionDataKey);
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setSubmissionData(data);
        } catch (error) {
          console.error('Error parsing submission data:', error);
        }
      }
    }
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setProjectDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isFormValid = () => {
    return (
      projectDetails.title.trim() !== '' &&
      projectDetails.description.trim() !== '' &&
      techStack.trim() !== '' &&
      files.length > 0
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Save submission data
          const submissionData: SubmissionData = {
            projectTitle: projectDetails.title,
            description: projectDetails.description,
            techStack: techStack,
            githubUrl: projectDetails.githubUrl || undefined,
            demoUrl: demoUrl || undefined,
            submissionDate: new Date().toISOString()
          };
          
          // Save to localStorage
          const submissionKey = `hackathon_submitted_${id}`;
          const submissionDataKey = `hackathon_submission_data_${id}`;
          localStorage.setItem(submissionKey, 'true');
          localStorage.setItem(submissionDataKey, JSON.stringify(submissionData));
          
          setSubmissionData(submissionData);
          setSubmitted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  if (submitted && submissionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-green-200">
            <CardHeader className="text-center bg-green-50">
              <CardTitle className="text-2xl font-bold text-green-900">
                View Submission
              </CardTitle>
              <p className="text-green-700">
                Your project has been successfully submitted
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Submission Success Banner */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-100 text-green-800">
                  <CheckCircle className="h-8 w-8" />
                  <span className="text-xl font-semibold">
                    Project Submitted Successfully!
                  </span>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Code className="h-5 w-5 text-blue-600" />
                      Project Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Project Title */}
                      <Card className="border-blue-200">
                        <CardContent className="p-4">
                          <div className="font-semibold text-blue-900 mb-2">Project Title</div>
                          <div className="text-gray-800 text-lg">{submissionData.projectTitle}</div>
                        </CardContent>
                      </Card>

                      {/* Submission Date */}
                      <Card className="border-blue-200">
                        <CardContent className="p-4">
                          <div className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Submitted On
                          </div>
                          <div className="text-gray-800">
                            {new Date(submissionData.submissionDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Project Description */}
                  <Card className="border-blue-200">
                    <CardContent className="p-4">
                      <div className="font-semibold text-blue-900 mb-2">Project Description</div>
                      <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {submissionData.description}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tech Stack */}
                  {submissionData.techStack && (
                    <Card className="border-blue-200">
                      <CardContent className="p-4">
                        <div className="font-semibold text-blue-900 mb-2">Technologies Used</div>
                        <div className="flex flex-wrap gap-2">
                          {submissionData.techStack.split(',').map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Project Links */}
                  {(submissionData.githubUrl || submissionData.demoUrl) && (
                    <Card className="border-blue-200">
                      <CardContent className="p-4">
                        <div className="font-semibold text-blue-900 mb-4">Project Links</div>
                        <div className="space-y-3">
                          {submissionData.githubUrl && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <Github className="h-5 w-5 text-gray-700" />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">GitHub Repository</div>
                                <a
                                  href={submissionData.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline break-all flex items-center gap-1"
                                >
                                  {submissionData.githubUrl}
                                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                                </a>
                              </div>
                            </div>
                          )}
                          
                          {submissionData.demoUrl && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <ExternalLink className="h-5 w-5 text-gray-700" />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">Live Demo</div>
                                <a
                                  href={submissionData.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline break-all flex items-center gap-1"
                                >
                                  {submissionData.demoUrl}
                                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Judging Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <Card className="border-blue-200">
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-blue-900">Judging Period</div>
                      <div className="text-sm text-gray-600">Results in 48 hours</div>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-200">
                    <CardContent className="p-4 text-center">
                      <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-blue-900">Prize Announcement</div>
                      <div className="text-sm text-gray-600">Winners notified via email</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 justify-center pt-6 border-t border-blue-200">
                  <Button 
                    onClick={() => navigate(`/hackathon/${id}`)}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Back to Hackathon
                  </Button>
                  <Button 
                    onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6 border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-2xl font-bold text-blue-900">
              Project Submission Round
            </CardTitle>
            <p className="text-blue-700">
              Submit your completed project with all required details and files.
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submission Guidelines */}
          <Card className="lg:col-span-1 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Submission Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Source Code</div>
                    <div className="text-sm text-gray-600">Upload your complete project files or provide GitHub repository link</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Documentation</div>
                    <div className="text-sm text-gray-600">Include README, setup instructions, and project description</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Github className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Source Code</div>
                    <div className="text-sm text-gray-600">Upload your complete project files or provide GitHub repository link (optional)</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900 mb-2">File Requirements:</div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Max file size: 100MB</li>
                  <li>• Accepted formats: ZIP, PDF, images</li>
                  <li>• Include source code and documentation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Main Submission Form */}
          <Card className="lg:col-span-2 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-xl text-blue-900">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Project Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-900 font-medium">Project Title *</Label>
                  <Input
                    id="title"
                    value={projectDetails.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter your project title"
                    className="mt-1 border-blue-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-900 font-medium">Project Description *</Label>
                  <Textarea
                    id="description"
                    value={projectDetails.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your project, its features, and the problem it solves..."
                    rows={4}
                    className="mt-1 border-blue-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <div>
                    <Label htmlFor="github" className="text-gray-900 font-medium flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub Repository (Optional)
                    </Label>
                    <Input
                      id="github"
                      value={projectDetails.githubUrl}
                      onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                      placeholder="https://github.com/username/repo"
                      className="mt-1 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="demo" className="text-gray-900 font-medium flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Demo URL (Optional)
                  </Label>
                  <Input
                    id="demo"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://your-project-demo.com"
                    className="mt-1 border-blue-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="techStack" className="text-gray-900 font-medium flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Tech Stack *
                  </Label>
                  <Input
                    id="techStack"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="React, Node.js, MongoDB, etc."
                    className="mt-1 border-blue-200 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <Label className="text-gray-900 font-medium flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Project Files *
                </Label>
                <div
                  className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-blue-300 hover:border-blue-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your files here, or{' '}
                    <button
                      type="button"
                      className="text-blue-600 underline"
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-gray-500">
                    Upload ZIP files, documentation, or screenshots
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    accept=".zip,.pdf,.png,.jpg,.jpeg,.gif,.mp4,.mov"
                  />
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <Label className="text-gray-900 font-medium">Uploaded Files:</Label>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-gray-900">{file.name}</div>
                            <div className="text-sm text-gray-600">{formatFileSize(file.size)}</div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:bg-red-100"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {uploading && (
                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Button */}
              <div className="flex justify-between items-center pt-6 border-t border-blue-200">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/hackathon/${id}`)}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Back to Hackathon
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || uploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  {uploading ? 'Submitting...' : 'Submit Project'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
