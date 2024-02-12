
import { Button } from "@/components/ui/button";
import
{
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";


export default function Home()
{
  return (
    <main className=" w-full  h-full flex justify-center items-center">
      <Card className=" w-[400px]">
        <CardHeader>
          <CardTitle>Admin DashBoard</CardTitle>
          <CardDescription>Welcome to Simotap Dashboard</CardDescription>
        </CardHeader>
        <CardContent >
          <Link href={'/auth/login'}>
            <Button variant={"outline"} className=" space-x-3 w-full" >
              <p>Login</p>
            </Button>
          </Link>
        </CardContent>
        <CardContent>
          <Link href={'/auth/register'}>
            <Button variant={"outline"} className=" space-x-3 w-full" >
              <p>Register</p>
            </Button>
          </Link>
        </CardContent>
        <CardFooter>
          <p>@Simotap Pvt Ltd</p>
        </CardFooter>
      </Card>

    </main>
  );
}
