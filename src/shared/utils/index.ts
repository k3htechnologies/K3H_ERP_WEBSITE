import { FILE_ISSUE } from "../constants";

export const scrollToTop = () => {
  window.scrollTo(0,0);
};

export const validatePhotoFile = (file: File) : {status : boolean, issue : string} => {
  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif'
  ];
  const maxSize = 5 * 1024 * 1024;
  if (!validTypes.includes(file.type)) {
    return {
      status : false,
      issue : FILE_ISSUE.FORMAT
    };
  }
  if (file.size > maxSize) {
    return {
      status : false,
      issue : FILE_ISSUE.SIZE
    };
  }
  return {
    status : true,
    issue : 'Success'
  };
};

export const validateResumeFile = (file: File) : {status : boolean, issue : string} => {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const maxSize = 5 * 1024 * 1024;
  if (!validTypes.includes(file.type)) {
    return {
      status : false,
      issue : FILE_ISSUE.FORMAT
    };
  }
  if (file.size > maxSize) {
    return {
      status : false,
      issue : FILE_ISSUE.SIZE
    };
  }
  return {
    status : true,
    issue : 'Success'
  };
};
