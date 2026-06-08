export interface UploadFieldProps {
  label: string;
  accept: string;
  file: File | null;
  error?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
  previewUrl?: string;
}
