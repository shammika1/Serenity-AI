import React, { useState } from "react";
import { AlertCircle, Music, PlayCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";

const EmotionCard = ({ emotion, description, onClick }) => (
  <Card className="w-[300px]">
    <CardHeader>
      <CardTitle>{emotion}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button onClick={onClick} className="w-full">
        <PlayCircle className="mr-2 h-4 w-4" /> Generate Music
      </Button>
    </CardFooter>
  </Card>
);

const AudioPlayer = ({ audioUrl }) => (
  <audio controls className="w-full mt-4">
    <source src={audioUrl} type="audio/wav" />
    Your browser does not support the audio element.
  </audio>
);

export default function SerenityApp() {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);

  const generateMusic = async (modelName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/generate/${modelName}`);
      if (!response.ok) throw new Error("Failed to generate music");
      const blob = await response.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError("An error occurred while generating music. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Serenity
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered Emotion-based Music Generation
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About Serenity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Serenity is an innovative AI-powered application that generates
              music tailored to your emotional state. Using advanced machine
              learning models, we create unique musical compositions to help you
              navigate through feelings of sadness, anger, and anxiety.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Choose an emotion to generate music:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <EmotionCard
            emotion="Sadness"
            description="Soothing melodies to comfort and uplift"
            onClick={() => generateMusic("model1")}
          />
          <EmotionCard
            emotion="Anger"
            description="Cathartic rhythms to release tension"
            onClick={() => generateMusic("model2")}
          />
          <EmotionCard
            emotion="Anxiety"
            description="Calming compositions to ease your mind"
            onClick={() => generateMusic("model3")}
          />
        </div>

        {loading && (
          <Alert>
            <Music className="h-4 w-4" />
            <AlertTitle>Generating Music</AlertTitle>
            <AlertDescription>
              Please wait while we compose your unique piece...
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

        <footer className="mt-12 text-center text-gray-600">
          <p>&copy; 2024 Serenity AI Music Generation. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
