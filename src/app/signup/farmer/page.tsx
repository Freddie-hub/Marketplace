import SignUpForm from "@/app/auth/signUpForm";

export default function CreateFarmerPage() {
  return (
    <SignUpForm
      role="FARMER"
      title="Farmer Registration"
      subtitle="Create an account to sell your coffee beans."
    />
  );
}