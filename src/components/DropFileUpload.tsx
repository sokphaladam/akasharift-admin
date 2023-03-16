import React, { useState, useCallback } from "react";
import { DropZone, LegacyStack, Thumbnail, Text } from "@shopify/polaris";

export function DropFileUpload({
  onComplete,
  allowMultiple,
  url,
}: {
  onComplete: (val: any[]) => void;
  allowMultiple?: boolean;
  url?: string | null;
}) {
  const [files, setFiles] = useState<any[]>([]);

  const handleDrop = useCallback(
    (_droppedFiles: any, acceptedFiles: any, rejectedFiles: any) => {
      const x = [...files, ...acceptedFiles];
      if (allowMultiple) {
        setFiles(x);
      } else {
        console.log(acceptedFiles);
        setFiles([acceptedFiles[0]]);
      }
      onComplete(x);
      // setRejectedFiles(rejectedFiles);
    },
    [files, onComplete]
  );

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name}{" "}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  );

  if (url) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Thumbnail source={url} alt="" size="large" />
        </div>
        <div>
          <DropZone
            allowMultiple={allowMultiple}
            accept="image/*"
            type="image"
            onDrop={handleDrop}
          >
            {uploadedFiles}
            {fileUpload}
          </DropZone>
        </div>
      </div>
    );
  }

  return (
    <DropZone
      allowMultiple={allowMultiple}
      accept="image/*"
      type="image"
      onDrop={handleDrop}
    >
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}
