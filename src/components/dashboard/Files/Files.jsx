import React, { useState } from 'react'
import './Files.css';

const Files = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [files] = useState([
    { id: 1, name: 'file1.txt', lastModified: '2025-01-10', size: '1.2 MB' },
    { id: 2, name: 'file2.docx', lastModified: '2025-01-09', size: '2.5 MB' },
    { id: 3, name: 'file3.pdf', lastModified: '2025-01-08', size: '3.0 MB' },
    { id: 4, name: 'file4.js', lastModified: '2025-01-07', size: '512 KB' },
    { id: 5, name: 'file5.css', lastModified: '2025-01-06', size: '256 KB' },
  ]);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="files">
     
       {/* Search Bar */}
       
       <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Files List */}
      <div className="files-list">
        {filteredFiles.length > 0 ? (
          filteredFiles.map(file => (
            <div key={file.id} className="file-item">
              <div className="file-name">{file.name}</div>
              <div className="file-details">
                <span>Last Modified: {file.lastModified}</span>
                <span>Size: {file.size}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun fichier trouvé.</p>
        )}
      </div>

    </div>
  )
}

export default Files
