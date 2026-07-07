import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./components/login-form";
import LoginCarousel from "./components/login-carousel";

function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Login background */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/images/login-hrms-bg.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.4]"
        />

        {/* Overlay content */}
        <div className="absolute inset-s-0 inset-e-0 bottom-0 p-10 text-white">
          <p className="font-semibold text-2xl mb-6">HRMS Dashboard</p>
          <p className="text-4xl font-bold mb-3.5">Get started today!</p>
          {/* Quote - about the platform */}
          <p className="text-xl leading-8 mb-14">
            "HRMS is the most powerful tool for managing your employees. <br /> It helps you to streamline your HR
            processes and improve employee satisfaction."
          </p>

          {/* Login carousel */}
          <LoginCarousel />
        </div>
      </div>

      {/* Login form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            HRMS Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
