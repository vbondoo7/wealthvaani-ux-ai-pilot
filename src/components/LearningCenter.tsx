
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Play, BookOpen, ArrowUpRight, Clock, Star, Video, Youtube } from "lucide-react";

const articles = [
  {
    title: "Understanding Mutual Funds",
    category: "Investing Basics",
    readTime: "5 min",
    author: "Priya Mehta",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW52ZXN0aW5nfGVufDB8fDB8fHww"
  },
  {
    title: "Tax Saving Investment Options",
    category: "Tax Planning",
    readTime: "8 min",
    author: "Rahul Gandhi",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21ed6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGF4fGVufDB8fDB8fHww"
  },
  {
    title: "Creating a Monthly Budget",
    category: "Personal Finance",
    readTime: "4 min",
    author: "Anjali Sharma",
    imageUrl: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVkZ2V0fGVufDB8fDB8fHww"
  },
  {
    title: "Introduction to Stock Market",
    category: "Investing Basics",
    readTime: "10 min",
    author: "Vikram Malhotra",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RvY2slMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D"
  }
];

const videos = [
  {
    title: "How to start investing with ₹1000",
    channel: "Finance Guru",
    duration: "15:24",
    views: "1.2M",
    thumbnail: "https://img.youtube.com/vi/2Aosql_3vBY/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=2Aosql_3vBY"
  },
  {
    title: "Understanding SIP investments",
    channel: "WealthEducator",
    duration: "08:45",
    views: "456K",
    thumbnail: "https://img.youtube.com/vi/Zg_UZ5Yg1Nw/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Zg_UZ5Yg1Nw"
  },
  {
    title: "Tax saving options for salaried employees",
    channel: "PersonalFinanceHub",
    duration: "12:21",
    views: "890K",
    thumbnail: "https://img.youtube.com/vi/1lGXk69iRXY/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=1lGXk69iRXY"
  },
  {
    title: "Emergency fund: Why you need it",
    channel: "MoneyMinded",
    duration: "07:15",
    views: "340K",
    thumbnail: "https://img.youtube.com/vi/U91hnztN2Fg/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=U91hnztN2Fg"
  }
];

const playlist = [
  {
    title: "Investment Basics for Beginners",
    videos: 12,
    thumbnail: "https://img.youtube.com/vi/2Aosql_3vBY/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=2Aosql_3vBY&list=PLvJNSf-7NfrNxtRMOGbQ_mlMwHfq56x-S"
  }
];

const courses = [
  {
    title: "Personal Finance Mastery",
    instructor: "Dr. Vikram Singh",
    level: "Beginner",
    lessons: 24,
    duration: "8 hours",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmluYW5jZSUyMGJvb2t8ZW58MHx8MHx8fDA%3D"
  },
  {
    title: "Stock Market Fundamentals",
    instructor: "Rajesh Khanna",
    level: "Intermediate",
    lessons: 18,
    duration: "6 hours",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1612696187503-58431f7b6a0d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RvY2slMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D"
  },
  {
    title: "Tax Planning Strategies",
    instructor: "Priya Sharma",
    level: "Advanced",
    lessons: 15,
    duration: "5.5 hours",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGF4fGVufDB8fDB8fHww"
  }
];

const LearningCenter: React.FC = () => {
  const { toast } = useToast();
  
  const handleOpenPlaylist = () => {
    window.open("https://www.youtube.com/watch?v=2Aosql_3vBY&list=PLvJNSf-7NfrNxtRMOGbQ_mlMwHfq56x-S", "_blank");
  };
  
  const handleOpenVideo = (url: string) => {
    window.open(url, "_blank");
    
    toast({
      title: "Video Opened",
      description: "The video is now playing in a new tab",
    });
  };
  
  return (
    <div className="wv-container py-6">
      <h1 className="text-2xl font-bold mb-2">Financial Learning Center</h1>
      <p className="text-muted-foreground mb-6">
        Enhance your financial knowledge with our curated learning materials
      </p>

      <Tabs defaultValue="articles">
        <TabsList className="grid grid-cols-3 max-w-xs mb-6">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-40 bg-muted">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-wealthveda-indigo/10 text-wealthveda-indigo">
                      {article.category}
                    </span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <p className="text-xs text-muted-foreground">By {article.author}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    Read Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Youtube className="h-5 w-5 mr-2 text-red-500" />
                Featured Playlist
              </CardTitle>
              <CardDescription>Complete financial guide for beginners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3 h-48 bg-muted rounded-md overflow-hidden">
                  <img 
                    src={playlist[0].thumbnail} 
                    alt={playlist[0].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{playlist[0].title}</h3>
                  <p className="text-muted-foreground mb-4">
                    This comprehensive playlist covers all the basic concepts of investing,
                    personal finance management, and financial planning for beginners.
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{playlist[0].videos} videos</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">3.5 hours total</span>
                    </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={handleOpenPlaylist}>
                    <Youtube className="mr-2 h-4 w-4" />
                    Watch Playlist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h3 className="font-semibold text-lg mb-4">Recommended Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-40 bg-muted">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/60 p-2 cursor-pointer" onClick={() => handleOpenVideo(video.url)}>
                      <Play className="h-6 w-6 text-white" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-2 mb-1">{video.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{video.channel}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{video.views} views</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleOpenVideo(video.url)}
                  >
                    Watch Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-40 bg-muted">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>By {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-muted">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div>
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button className="w-full">
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningCenter;
