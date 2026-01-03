import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdEmail, MdLock, MdPerson, MdImage } from 'react-icons/md';
import toast from 'react-hot-toast';
import '../../styles/Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', photo: null });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('token', 'dummy-token-123');
        localStorage.setItem('user', JSON.stringify({ 
          name: formData.name, 
          email: formData.email,
          photo: formData.photo
        }));
        toast.success('Account created successfully!');
        navigate('/dashboard');
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Sign up failed');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">💰 ExpenseTracker</h1>
          <p className="auth-subtitle">Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-wrapper">
              <MdPerson className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-wrapper">
              <MdEmail className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-wrapper">
              <MdLock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <MdLock className="input-icon" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="photo" className="form-label">Profile Photo (Optional)</label>
            <div className="photo-upload">
              {photoPreview ? (
                <div className="photo-preview">
                  <div className="photo-preview-wrapper">
                    <img src={photoPreview} alt="Preview" />
                    <div className="upload-badge">✓</div>
                  </div>
                  <div className="photo-info">
                    <p>Photo Uploaded</p>
                    <span>Click below to change</span>
                  </div>
                  <button
                    type="button"
                    className="remove-photo-btn"
                    onClick={() => {
                      setPhotoPreview(null);
                      setFormData(prev => ({ ...prev, photo: null }));
                    }}
                  >
                    Change Photo
                  </button>
                </div>
              ) : (
                <label className="upload-label">
                  <div className="upload-icon">
                    <MdImage />
                  </div>
                  <span>Upload Photo</span>
                  <p>Click to add your profile picture</p>
                  <input
                    type="file"
                    id="photo"
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="photo-input"
                  />
                </label>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;