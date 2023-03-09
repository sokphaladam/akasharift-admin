import React, { useState, useCallback } from "react";
import { DropZone, LegacyStack, Thumbnail, Text } from "@shopify/polaris";

export function DropFileUpload() {
  const [files, setFiles] = useState<any[]>([]);

  const handleDrop = useCallback(
    (_droppedFiles: any, acceptedFiles: any, rejectedFiles: any) => {
      setFiles((files) => [...files, ...acceptedFiles]);
      // setRejectedFiles(rejectedFiles);
    },
    []
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

  return (
    <DropZone accept="image/*" type="image" onDrop={handleDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}
