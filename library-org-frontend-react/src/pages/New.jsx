import React, { useRef, useState, useEffect } from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export default function New() {
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      if (file) {
        handleFileUpload(file);
      }
    }, [file]);
  
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        },
        (error) => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, coverImage: downloadURL })
          );
        }
      );
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:2000/v1/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/home');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Book Registration</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Title'
          className='border p-3 rounded-lg'
          id='title'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Author'
          className='border p-3 rounded-lg'
          id='author'
          onChange={handleChange}
        />
        <textarea
          type='text'
          placeholder='Description'
          className='border p-3 rounded-lg'
          id='description'
          onChange={handleChange}
          cols={30}
          rows={10}
        />
        <p className='text-sm'>Upload Cover Image</p>
         <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type='file'
                  ref={fileRef}
                  hidden
                  accept='image/*'
                />
                <button
                  type='button'
                  onClick={() => fileRef.current.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      fileRef.current.click();
                    }
                  }}
                  className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-0 border-none bg-transparent'
                  tabIndex={0}
                >
                  <img
                    src={formData.coverImage}
                    alt='cover here'
                    className='rounded-full h-24 w-24 object-cover'
                  />
                </button>
                <p className='text-sm self-center'>
                  {fileUploadError ? (
                    <span className='text-red-700'>
                      Error upload (image must be less than 2 mb)
                    </span>
                  ) : (
                    <>  
                      {filePerc > 0 && filePerc < 100 && (
                        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                      )}
                    </>
                  )}
                  {filePerc === 100 && !fileUploadError && (
                    <span className='text-green-700'>Cover successfully uploaded!</span>
                  )}
                </p>
        <button
          disabled={loading}
          className='bg-gradient-to-r from-indigo-900 via-purple-950 to-pink-950 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Add'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>You do not want to create a Book?</p>
        <Link to={'/home'}>
          <span className='text-blue-700'>Cancel</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
