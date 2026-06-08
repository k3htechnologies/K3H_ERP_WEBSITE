import { Eye, Upload, Trash2 } from 'lucide-react';
import type { UploadFieldProps } from './UploadField.type';

const UploadField = ({
  label,
  accept,
  file,
  error,
  onUpload,
  onRemove,
  previewUrl,
}: UploadFieldProps) => {
  return (
    <div>
      <label className="dm-sans text-[11px] font-semibold uppercase tracking-widest text-[#43474F]">
        {label}
      </label>

      <div
        className={`
          mt-3 flex h-14 items-center justify-between border-b px-4
          ${
            error
              ? 'border-red-400'
              : 'border-black/10 focus-within:border-primary'
          }
        `}
      >
        {!file ? (
          <>
            <span className="text-sm text-[#9CA3AF]">Select file</span>

            <label className="cursor-pointer">
              <input
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) {
                    onUpload(selected);
                  }
                }}
              />

              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Upload size={16} />
                Browse
              </span>
            </label>
          </>
        ) : (
          <>
            <p className="max-w-[45%] truncate text-sm font-medium text-text">
              {file.name}
            </p>

            <div className="flex items-center gap-2">
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => window.open(previewUrl, '_blank')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary"
                >
                  <Eye size={14} />
                  Preview
                </button>
              )}

              <button
                type="button"
                onClick={onRemove}
                className="inline-flex items-center gap-1 text-xs font-medium text-red-500"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          </>
        )}
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default UploadField;
