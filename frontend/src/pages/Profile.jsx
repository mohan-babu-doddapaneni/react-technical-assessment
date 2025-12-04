import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getProfile();
        const data = res.data.data;
        setProfile(data);
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
        });
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Failed to load profile. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await updateProfile(form);
      setProfile(res.data.data);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="page">
        <div className="page-inner">
          <p>Loading profile...</p>
        </div>
      </div>
    );

  if (error && !profile)
    return (
      <div className="page">
        <div className="page-inner">
          <p className="error-text">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="page">
      <div className="page-inner profile-page">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account details and personal information.</p>
        </div>

        <div className="profile-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Email
                <input value={profile.email} disabled />
              </label>
            </div>

            <div className="form-row form-row-two">
              <label>
                First Name
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Last Name
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </label>
            </div>

            {message && <div className="form-success">{message}</div>}
            {error && <div className="form-error">{error}</div>}

            <div className="profile-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
