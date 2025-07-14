import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Upload,
  FileText,
  Link,
  CheckCircle,
  AlertCircle,
  Trophy,
  Calendar,
  Clock,
  Target,
  Github,
  ExternalLink,
  Trash2,
  Plus
} from "lucide-react";

interface FileSubmission {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

const SubmissionRound = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [files, setFiles] = useState<FileSubmission[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [newTech, setNewTech] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submissionData, setSubmissionData] = useState<any>(null);

  // Check if project was already submitted on component mount
  React.useEffect(() => {
    const submissionKey = `hackathon_submitted_${id}`;
    const submissionDataKey = `hackathon_submission_data_${id}`;
    const isAlreadySubmitted = localStorage.getItem(submissionKey) === 'true';
    
    if (isAlreadySubmitted) {
      setIsSubmitted(true);
      setUploadProgress(100);
      
      // Load submission data
      const storedData = localStorage.getItem(submissionDataKey);
      if (storedData) {
        const data = JSON.parse(storedData);
        setSubmissionData(data);
        // Also populate form fields for viewing
        setProjectTitle(data.projectTitle || '');
        setProjectDescription(data.projectDescription || '');
        setGithubUrl(data.githubUrl || '');
        setLiveUrl(data.liveUrl || '');
        setVideoUrl(data.videoUrl || '');
        setTechStack(data.techStack || []);
      }
    }
  }, [id]);

  // Deadline: 2 days from now
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 2);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    const newFiles: FileSubmission[] = uploadedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const addTechStack = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack(prev => [...prev, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTechStack = (tech: string) => {
    setTechStack(prev => prev.filter(t => t !== tech));
  };

  const handleSubmit = async () => {
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSubmitted(true);
          
          // Save submission state and data to localStorage
          const submissionKey = `hackathon_submitted_${id}`;
          const submissionDataKey = `hackathon_submission_data_${id}`;
          const submissionData = {
            projectTitle,
            projectDescription,
            githubUrl,
            liveUrl,
            videoUrl,
            techStack,
            files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
            submittedAt: new Date().toISOString(),
            submissionId: `HSB-${Date.now().toString().slice(-6)}`
          };
          
          localStorage.setItem(submissionKey, 'true');
          localStorage.setItem(submissionDataKey, JSON.stringify(submissionData));
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const isFormValid = projectTitle.trim() && projectDescription.trim();
  const totalFiles = files.length;
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30">
        <div className="bg-white border-b border-blue-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(`/hackathon/${id}`)}
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Hackathon
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">Submission Successful</h1>
                <p className="text-blue-600">Your project has been submitted</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-green-700">
                Project Submitted Successfully!
              </CardTitle>
              <p className="text-gray-600 text-lg">
                Your hackathon submission has been received and is under review.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-4">Submission Details</h3>
                <div className="space-y-4">
                  {/* Project Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-blue-600 font-medium">Project Title:</span>
                      <p className="font-semibold text-blue-900 text-lg">{submissionData?.projectTitle || projectTitle}</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Submission ID:</span>
                      <p className="font-mono text-blue-900">{submissionData?.submissionId || `HSB-${Date.now().toString().slice(-6)}`}</p>
                    </div>
                  </div>

                  {/* Project Description */}
                  {(submissionData?.projectDescription || projectDescription) && (
                    <div>
                      <span className="text-blue-600 font-medium">Project Description:</span>
                      <p className="text-blue-900 mt-1 p-3 bg-white rounded border text-sm">
                        {submissionData?.projectDescription || projectDescription}
                      </p>
                    </div>
                  )}

                  {/* URLs Section */}
                  <div className="space-y-3">
                    <h4 className="text-blue-700 font-medium">Project Links:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(submissionData?.githubUrl || githubUrl) && (
                        <div className="flex items-center gap-2 p-3 bg-white rounded border">
                          <Github className="h-4 w-4 text-gray-600" />
                          <div>
                            <span className="text-blue-600 text-xs font-medium">GitHub:</span>
                            <a 
                              href={submissionData?.githubUrl || githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block text-blue-700 hover:text-blue-800 text-sm truncate"
                            >
                              {submissionData?.githubUrl || githubUrl}
                            </a>
                          </div>
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                        </div>
                      )}
                      {(submissionData?.liveUrl || liveUrl) && (
                        <div className="flex items-center gap-2 p-3 bg-white rounded border">
                          <ExternalLink className="h-4 w-4 text-gray-600" />
                          <div>
                            <span className="text-blue-600 text-xs font-medium">Live Demo:</span>
                            <a 
                              href={submissionData?.liveUrl || liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block text-blue-700 hover:text-blue-800 text-sm truncate"
                            >
                              {submissionData?.liveUrl || liveUrl}
                            </a>
                          </div>
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                        </div>
                      )}
                      {(submissionData?.videoUrl || videoUrl) && (
                        <div className="flex items-center gap-2 p-3 bg-white rounded border md:col-span-2">
                          <FileText className="h-4 w-4 text-gray-600" />
                          <div>
                            <span className="text-blue-600 text-xs font-medium">Demo Video:</span>
                            <a 
                              href={submissionData?.videoUrl || videoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block text-blue-700 hover:text-blue-800 text-sm truncate"
                            >
                              {submissionData?.videoUrl || videoUrl}
                            </a>
                          </div>
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  {(submissionData?.techStack?.length > 0 || techStack.length > 0) && (
                    <div>
                      <span className="text-blue-600 font-medium">Technologies Used:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(submissionData?.techStack || techStack).map((tech: string, index: number) => (
                          <Badge 
                            key={index} 
                            className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Files and Submission Time */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-blue-200">
                    <div>
                      <span className="text-blue-600 font-medium">Files Uploaded:</span>
                      <p className="text-blue-900 font-semibold">{submissionData?.files?.length || totalFiles} files</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Submitted On:</span>
                      <p className="text-blue-900 font-semibold">
                        {submissionData?.submittedAt 
                          ? new Date(submissionData.submittedAt).toLocaleDateString()
                          : new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Submitted At:</span>
                      <p className="text-blue-900 font-semibold">
                        {submissionData?.submittedAt 
                          ? new Date(submissionData.submittedAt).toLocaleTimeString()
                          : new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  You will receive email notifications about the evaluation process and results.
                  The judging panel will review all submissions and announce results within 48 hours.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={() => navigate(`/hackathon/${id}`)}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    Back to Hackathon
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Go to Dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(`/hackathon/${id}`)}
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">Project Submission</h1>
                <p className="text-blue-600">Final Round - Submit your project</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-lg">
              <Clock className="h-4 w-4 text-red-600" />
              <span className="text-red-900 font-medium">
                Due: {deadline.toLocaleDateString()} at 11:59 PM
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {uploadProgress > 0 && uploadProgress < 100 && (
          <Card className="bg-white border-blue-100 shadow-sm mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Upload className="h-5 w-5 text-blue-600" />
                <span className="text-blue-900 font-medium">Uploading submission...</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-blue-600 mt-2">{uploadProgress}% complete</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Information */}
            <Card className="bg-white border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Target className="h-5 w-5 text-blue-600" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-blue-900">Project Title *</Label>
                  <Input
                    id="title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Enter your project title"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-blue-900">Project Description *</Label>
                  <Textarea
                    id="description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your project, its features, and how it solves the problem"
                    rows={4}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="tech-stack" className="text-blue-900">Technology Stack</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      id="tech-stack"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="e.g., React, Node.js, MongoDB"
                      className="border-blue-200 focus:border-blue-500"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                    />
                    <Button onClick={addTechStack} variant="outline" className="border-blue-200">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-blue-100 text-blue-800">
                        {tech}
                        <button
                          onClick={() => removeTechStack(tech)}
                          className="ml-2 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card className="bg-white border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Link className="h-5 w-5 text-blue-600" />
                  Project Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="github" className="text-blue-900">GitHub Repository (Optional)</Label>
                  <div className="flex gap-2">
                    <Github className="h-5 w-5 text-gray-400 mt-2" />
                    <Input
                      id="github"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="live" className="text-blue-900">Live Demo URL</Label>
                  <div className="flex gap-2">
                    <ExternalLink className="h-5 w-5 text-gray-400 mt-2" />
                    <Input
                      id="live"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://your-project-demo.com"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="video" className="text-blue-900">Demo Video URL</Label>
                  <div className="flex gap-2">
                    <ExternalLink className="h-5 w-5 text-gray-400 mt-2" />
                    <Input
                      id="video"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="bg-white border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Upload className="h-5 w-5 text-blue-600" />
                  Additional Files
                </CardTitle>
                <p className="text-sm text-blue-600">Upload documentation, screenshots, or additional resources</p>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-blue-900 font-medium">Click to upload files</p>
                    <p className="text-sm text-blue-600">PDF, DOC, Images, ZIP (Max 10MB each)</p>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">{file.name}</p>
                            <p className="text-xs text-blue-600">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission Guidelines */}
            <Card className="bg-white border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-blue-800">Project must address the hackathon theme</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-blue-800">Include clear documentation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-blue-800">GitHub repository must be public</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-blue-800">Demo video (max 3 minutes)</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span className="text-blue-800">Late submissions will not be accepted</span>
                </div>
              </CardContent>
            </Card>

            {/* Submission Summary */}
            <Card className="bg-white border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">Submission Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-600">Project Title:</span>
                  <span className="text-blue-900">{projectTitle ? '✓' : '✗'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Description:</span>
                  <span className="text-blue-900">{projectDescription ? '✓' : '✗'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">GitHub URL (Optional):</span>
                  <span className="text-blue-900">{githubUrl ? '✓' : '○'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Tech Stack:</span>
                  <span className="text-blue-900">{techStack.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Files:</span>
                  <span className="text-blue-900">{totalFiles} uploaded</span>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || uploadProgress > 0}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
              size="lg"
            >
              <Trophy className="h-5 w-5 mr-2" />
              Submit Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionRound;
