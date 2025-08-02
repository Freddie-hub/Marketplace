import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import Link from "next/link";

const ACCEPT_INVITATION = gql`
  mutation AcceptInvitation($token: String!) {
    acceptInvitation(token: $token) {
      success
      message
      redirectUrl
    }
  }
`;

const REJECT_INVITATION = gql`
  mutation RejectInvitation($token: String!) {
    rejectInvitation(token: $token) {
      success
      message
      redirectUrl
    }
  }
`;

export default function InvitePage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const token = params.token;

  const [acceptInvitation, { data: acceptData, loading: acceptLoading, error: acceptError }] = useMutation(ACCEPT_INVITATION);
  const [rejectInvitation, { data: rejectData, loading: rejectLoading, error: rejectError }] = useMutation(REJECT_INVITATION);

  useEffect(() => {
    if (action === "accept") {
      acceptInvitation({ variables: { token } });
    } else if (action === "reject") {
      rejectInvitation({ variables: { token } });
    }
  }, [action, token, acceptInvitation, rejectInvitation]);

  useEffect(() => {
    if (acceptData?.acceptInvitation?.success) {
      setTimeout(() => {
        router.push(acceptData.acceptInvitation.redirectUrl || "/login");
      }, 3000);
    } else if (rejectData?.rejectInvitation?.success) {
      setTimeout(() => {
        router.push(rejectData.rejectInvitation.redirectUrl || "/");
      }, 3000);
    }
  }, [acceptData, rejectData, router]);

  const isLoading = acceptLoading || rejectLoading;
  const error = acceptError || rejectError;
  const message =
    acceptData?.acceptInvitation?.message ||
    rejectData?.rejectInvitation?.message ||
    (action === "accept" ? "Processing invitation acceptance..." : "Processing invitation rejection...");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Green Mafia Invitation</h1>
        {isLoading && <p className="text-center text-gray-600">Loading...</p>}
        {error && (
          <p className="mb-4 rounded bg-red-100 p-3 text-center text-red-700">
            Error: {error.message}
          </p>
        )}
        {!isLoading && !error && (
          <div>
            <p className="mb-4 text-center text-gray-600">{message}</p>
            <p className="text-center text-sm text-gray-500">
              You will be redirected shortly. If not,{" "}
              <Link
                href={acceptData?.acceptInvitation?.redirectUrl || rejectData?.rejectInvitation?.redirectUrl || "/"}
                className="text-blue-500 hover:underline"
              >
                click here
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}