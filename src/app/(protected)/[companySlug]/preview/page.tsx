import PreviewPageContent from "@/components/company/previewPageContent";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function PreviewPage() {
  return (
    <ProtectedRoute>
      <PreviewPageContent />
    </ProtectedRoute>
  );
}
