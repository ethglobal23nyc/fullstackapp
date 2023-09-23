import React, { useState } from "react"
import { Box, Input, Button, Text } from "@chakra-ui/react"
import { Web3Storage } from "web3.storage"

// https://web3.storage/docs/how-tos/generate-api-token/
const WEB3_STORAGE_API_TOKEN: string = process.env.WEB3_STORAGE_API_TOKEN || ""
const MAX_FILESIZE = 5 * 1024 * 1024 // 5 MB

export function UploadFileIPFSBox() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string | null>("")

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleFileUpload = async () => {
    if (selectedFile) {
      if (selectedFile.size <= MAX_FILESIZE) {
        // Create a web3.storage client
        const client = new Web3Storage({
          token: WEB3_STORAGE_API_TOKEN,
        })

        // Prepare the data for upload
        const data = [selectedFile]

        try {
          // Upload the file to web3.storage
          const cid = await client.put(data)

          // Handle successful upload
          setSelectedFile(null)
          setUploadStatus(`https://dweb.link/ipfs/${cid}`)
        } catch (error) {
          // Handle upload error
          setUploadStatus("File upload failed. Please try again later.")
        }
      } else {
        setUploadStatus("Please select a file (less than 5 MB) for upload.")
      }
    } else {
      setUploadStatus("Please select a file for upload.")
    }
  }

  return (
    <Box>
      <Input type="file" display="none" id="file-input" onChange={handleFileChange} />
      <label htmlFor="file-input">
        <Button as="span" colorScheme="teal">
          Select File
        </Button>
      </label>
      {selectedFile && (
        <Box>
          <Text>{selectedFile.name}</Text>
          <Button mt={2} onClick={handleFileUpload} colorScheme="blue">
            Upload File
          </Button>
        </Box>
      )}
      <Text>Upload Status: {uploadStatus}</Text>
    </Box>
  )
}
