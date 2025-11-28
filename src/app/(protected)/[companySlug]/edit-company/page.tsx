import CompanyEditor from "@/components/company/protected/companyEditor";
import ProtectedRoute from "@/components/wrapper/ProtectedRoute";

export default function CompanyEditorPage() {
  return (
    <ProtectedRoute>
      <CompanyEditor />
    </ProtectedRoute>
  );
}
