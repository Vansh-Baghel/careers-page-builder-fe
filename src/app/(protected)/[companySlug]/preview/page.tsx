import PreviewPageContent from "@/components/company/protected/previewPageContent";
import ProtectedRoute from "@/components/wrapper/ProtectedRoute";

export default function PreviewPage() {
  return (
    <ProtectedRoute>
      <PreviewPageContent />
    </ProtectedRoute>
  );
}
