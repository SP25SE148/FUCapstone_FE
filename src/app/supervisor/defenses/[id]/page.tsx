"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  FileCheck,
  Calendar,
  PenTool,
  User2,
  MapPin,
  Clock,
} from "lucide-react";
import { useParams } from "next/navigation";
import DownloadDocument from "@/app/supervisor/defenses/[id]/components/download-document";
import { useState, useEffect } from "react";
import { useSupervisorDefense } from "@/contexts/supervisor/supervisor-defense-context";
import { getDateNoTime } from "@/lib/utils";
import UploadMinutes from "@/app/supervisor/defenses/[id]/components/upload-minutes";
import ContinueDefense from "@/app/supervisor/defenses/[id]/components/continue-defense";
import { useAuth } from "@/contexts/auth-context";

export default function DefenseTopicDetail() {
  const params = useParams();
  const id: string = String(params.id);
  const { user } = useAuth();
  const { getDefendCapstoneCalendarById } = useSupervisorDefense();
  const [defenseInfo, setDefenseInfo] = useState<any>(null);

  useEffect(() => {
    const fetchDefenseInfo = async () => {
      const data = await getDefendCapstoneCalendarById(id);
      if (data) {
        setDefenseInfo(data);
      }
    };

    fetchDefenseInfo();
  }, [id, getDefendCapstoneCalendarById]);

  if (!defenseInfo) {
    return <p className="text-center text-red-500">Defense not found.</p>;
  }

  const isSecretary = defenseInfo.councilMembers.some(
    (member: any) =>
      member.supervisorId ===
        user?.[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
        ] && member.isSecretary
  );

  const isPresident = defenseInfo.councilMembers.some(
    (member: any) =>
      member.supervisorId ===
        user?.[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
        ] && member.isPresident
  );

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-xl text-primary">
              {defenseInfo.topicEngName}
            </CardTitle>
            <CardDescription>{defenseInfo.topicVietName}</CardDescription>
          </CardHeader>
        </div>
        <div className="mr-6">
          <DownloadDocument topic={[]} />
        </div>
      </div>

      <CardContent className="space-y-4">
        {defenseInfo && (
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              Defense Information
            </h3>
            <Card className="bg-primary/5">
              <CardContent className="p-6 space-y-2">
                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-2">
                      <Calendar className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground">
                        Defense Date
                      </h3>
                      <p className="font-semibold tracking-tight">
                        {getDateNoTime(defenseInfo.defenseDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-2">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground">Slot</h3>
                      <p className="font-semibold tracking-tight">
                        {defenseInfo.slot}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-2">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground">
                        Location
                      </h3>
                      <p className="font-semibold tracking-tight">
                        {defenseInfo.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted rounded-md p-2">
                      <FileCheck className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground">Attempt</h3>
                      <p className="font-semibold tracking-tight">
                        {defenseInfo.defendAttempt}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <BookOpen className="size-4 text-primary" />
              General Information
            </h3>
          </div>
          <Card className="bg-primary/5">
            <CardContent className="p-6 space-y-2">
              <div className="grid grid-cols-4 gap-6 text-sm border-b pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <PenTool className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Abbreviation
                    </h3>
                    <p className="font-semibold tracking-tight">
                      {defenseInfo.abbreviation}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <Calendar className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Semester</h3>
                    <p className="font-semibold tracking-tight">
                      {defenseInfo.semesterId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BookOpen className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Capstone</h3>
                    <p className="font-semibold tracking-tight">
                      {defenseInfo.capstoneId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <FileCheck className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Topic code
                    </h3>
                    <p className="font-semibold tracking-tight">
                      {defenseInfo.topicCode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm text-muted-foreground">Description:</h3>
                <p className="font-semibold tracking-tight text-justify italic">
                  {defenseInfo.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {defenseInfo &&
          defenseInfo.councilMembers &&
          defenseInfo.councilMembers.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="size-4 text-primary" />
                Council Members:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {defenseInfo.councilMembers
                  .sort((a: any, b: any) => {
                    if (a.isPresident) return -1;
                    if (b.isPresident) return 1;
                    if (a.isSecretary) return -1;
                    if (b.isSecretary) return 1;
                    return 0;
                  })
                  .map((member: any, index: number) => (
                    <Card key={index} className="bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-12 border-2 border-primary">
                            <AvatarFallback className="bg-primary/10">
                              <User2 className="size-6 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">
                                {member.supervisorName}
                              </p>
                              {member.isPresident && (
                                <Badge
                                  variant="outline"
                                  className="bg-primary/10"
                                >
                                  President
                                </Badge>
                              )}
                              {member.isSecretary && (
                                <Badge
                                  variant="outline"
                                  className="bg-primary/10"
                                >
                                  Secretary
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {member.supervisorId}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

        {defenseInfo.mainSupervisorName && (
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="size-4 text-primary" />
              Supervisor(s):
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Card className="bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="size-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {defenseInfo.mainSupervisorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {defenseInfo.mainSupervisorEmail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {defenseInfo.coSupervisors?.map(
                (supervisor: any, index: number) => (
                  <Card key={index} className="bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-12 border-2 border-primary">
                          <AvatarFallback className="bg-primary/10">
                            <User2 className="size-6 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">
                            {supervisor.SupervisorName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {supervisor.SupervisorEmail}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-4">
        {(isSecretary || isPresident) && <UploadMinutes defendCapstoneCalendarId={defenseInfo.id} />}

        {isPresident && (
          <ContinueDefense defendCapstoneCalendarId={defenseInfo.id} />
        )}
      </CardFooter>
    </Card>
  );
}
