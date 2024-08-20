import React, { useState } from 'react';

interface MintNFTProps {
  mintNFT: (name: string, description: string, image: File) => Promise<void>;
}

const MintNFTComponent: React.FC<MintNFTProps> = ({ mintNFT }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null); // To display error messages

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (image) {
      try {
        await mintNFT(name, description, image); // Assuming mintNFT is an async function
        alert('NFT minted successfully!');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred during NFT minting.');
        }
      }
    } else {
      alert('Please select an image for your NFT');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nftName">NFT Name:</label>
        <input
          id="nftName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="nftDescription">Description:</label>
        <textarea
          id="nftDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="nftImage">Image:</label>
        <input
          id="nftImage"
          type="file"
          onChange={handleFileChange}
          required
        />
      </div>
      {error && (<p style={{color: 'red'}}>Error: {error}</p>)}
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default MintNFTComponent;