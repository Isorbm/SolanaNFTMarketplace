import React, { useState } from 'react';


interface MintNFTProps {
  mintNFT: (name: string, description: string, image: File) => void;
}

const MintNFTComponent: React.FC<MintNFTProps> = ({ mintNFT }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (image) {
      mintNFT(name, description, image);
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
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default MintNFTComponent;