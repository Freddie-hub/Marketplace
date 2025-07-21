import SignUpForm from "@/app/auth/signUpForm";

export default function CreateBuyerPage() {
  return (
    <SignUpForm
      role="BUYER"
      title="Buyer Registration"
      subtitle="Join our marketplace to purchase high-quality coffee."
    />
  );
}