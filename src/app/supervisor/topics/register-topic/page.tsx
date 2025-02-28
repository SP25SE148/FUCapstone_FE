<<<<<<< HEAD
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterTopicForm from "@/app/supervisor/topics/register-topic/components/register-topic-form";
=======
import { Download, Send } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterTopicForm from "@/app/supervisor/topics/register-topic/components/register-topic-form";
import { Button } from "@/components/ui/button";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd

export default function RegisterTopicPage() {
  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">
          Register New Topic
        </CardTitle>
        <CardDescription>
          Fill in the required information to register a new topic
        </CardDescription>
      </CardHeader>
      <RegisterTopicForm />
<<<<<<< HEAD
=======
      <CardFooter className="justify-between">
        <Button
          variant={"outline"}
          className="h-12 border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Download />
          Template
        </Button>
        <Button className="h-12">
          <Send />
          Register
        </Button>
      </CardFooter>
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
    </Card>
  );
}