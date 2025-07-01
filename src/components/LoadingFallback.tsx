import { Loader2,} from "lucide-react";

export default function LoadingFallback() {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md mx-4 bg-white shadow-lg rounded-xl overflow-hidden border">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
            <p className="text-center text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }