import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  return (
    <div className="flex flex-1 flex-col p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>
                View and manage your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                  JD
                </div>
                <div className="text-center">
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Member since</p>
                <p className="text-sm text-muted-foreground">January 1, 2023</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Objects identified</p>
                <p className="text-sm text-muted-foreground">24</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Objects submitted</p>
                <p className="text-sm text-muted-foreground">12</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account Settings</TabsTrigger>
              <TabsTrigger value="submissions">My Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      defaultValue="john@example.com"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" placeholder="Tell us about yourself" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-new-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="submissions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Submissions</CardTitle>
                  <CardDescription>
                    View and manage your submitted objects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      You haven&apos;t submitted any objects yet.
                    </p>
                    <Button className="mt-4">Submit an Object</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
