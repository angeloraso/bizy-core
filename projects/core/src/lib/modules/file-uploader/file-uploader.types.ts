import type { UppyFile } from '@uppy/core';

export enum BIZY_FILE_UPLOADER_MODE {
  UPLOAD = 'UPLOAD',
  ATTACH = 'ATTACH'
}

export type BizyFileUploaderAttachment = {
  id: string;
  file: Blob | File;
  meta: BizyFileUploaderFile['meta'];
  name: string;
  size: number | null;
  type: string;
};

export type BizyFileUploaderLoadFile = {
  id: string;
  file: File;
};

export type BizyFileUploaderInputFile = File | BizyFileUploaderLoadFile;

export type BizyFileUploaderMeta = {
  referenceId?: string;
  relativePath?: string;
};

export type BizyFileUploaderResponseBody = {
  [key: string]: unknown;
  fileId: string;
  response?: XMLHttpRequest;
};

export type BizyFileUploaderFile = UppyFile<BizyFileUploaderMeta, BizyFileUploaderResponseBody>;

export type BizyFileUploaderSuccessResponse = NonNullable<BizyFileUploaderFile['response']>;
export type BizyFileUploaderErrorResponse = Omit<BizyFileUploaderSuccessResponse, 'uploadURL'>;
