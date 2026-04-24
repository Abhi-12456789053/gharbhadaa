import React, { useState, useEffect } from 'react';

const App = () => {
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('gharbhada_pro_final_v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({ 
    location: '', price: '', contact: '', desc: '', type: 'Room', image: null,
    amenities: { wifi: false, water: false, parking: false }
  });
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('gharbada_pro_final_v2', JSON.stringify(listings));
  }, [listings]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result });
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListings([{ ...formData, id: Date.now() }, ...listings]);
    setFormData({ location: '', price: '', contact: '', desc: '', type: 'Room', image: null, amenities: { wifi: false, water: false, parking: false } });
    setShowModal(false);
  };

  const filtered = listings.filter(l => l.location.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ backgroundColor: '#fdfdff', minHeight: '100vh', color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif", scrollBehavior: 'smooth' }}>
      
      {/* NAVBAR */}
      <nav style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '1rem 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#4f46e5', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <i className="fa-solid fa-house-chimney"></i>
          </div>
          <h1 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>GharBada</h1>
        </div>

        <div style={{ display: 'flex', gap: '25px' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>Home</a>
          <a href="#about" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>About</a>
          <a href="#rooms" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>Rooms</a>
          <a href="#contact" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>Contact</a>
        </div>

        <button onClick={() => setShowModal(true)} style={{ background: '#1e1b4b', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '100px', fontWeight: '700', cursor: 'pointer' }}>
          + List Property
        </button>
      </nav>

      {/* HERO SECTION */}
      <div id="home" style={{ padding: '6rem 1rem 4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-1.5px', color: '#0f172a' }}>Rent with Confidence.</h2>
        <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Nepal's premier room and flat rental marketplace.</p>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '8px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', display: 'flex', border: '1px solid #f1f5f9' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ alignSelf: 'center', padding: '0 20px', color: '#94a3b8' }}></i>
          <input type="text" placeholder="Where do you want to live?" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '0.8rem 0', border: 'none', outline: 'none', fontSize: '1rem' }} />
        </div>
      </div>

      {/* ABOUT SECTION (PLACEHOLDER) */}
      <div id="about" style={{ padding: '4rem 8%', textAlign: 'center', background: '#f8fafc' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1rem' }}>Why Choose GharBada?</h3>
        <p style={{ maxWidth: '700px', margin: '0 auto', color: '#64748b', lineHeight: '1.7' }}>We connect local landowners directly with verified tenants. No middleman, no hidden fees. Just direct communication through WhatsApp and calls.</p>
      </div>

      {/* ROOMS LISTINGS */}
      <main id="rooms" style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
        {filtered.map((room) => (
          <div key={room.id} style={{ background: 'white', borderRadius: '32px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', position: 'relative' }}>
            <button onClick={() => setListings(listings.filter(l => l.id !== room.id))} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.9)', border: 'none', width: '35px', height: '35px', borderRadius: '12px', cursor: 'pointer', color: '#ef4444', zIndex: 10 }}><i className="fa-solid fa-trash-can"></i></button>
            <div style={{ height: '220px', background: '#f1f5f9' }}>
              {room.image ? <img src={room.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="room" /> : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '4rem' }}><i className="fa-solid fa-image"></i></div>}
            </div>
            <div style={{ padding: '1.8rem' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                {room.amenities.wifi && <span style={{ color: '#6366f1', background: '#eef2ff', padding: '5px 10px', borderRadius: '8px', fontSize: '0.8rem' }}><i className="fa-solid fa-wifi mr-2"></i>WiFi</span>}
                {room.amenities.water && <span style={{ color: '#0ea5e9', background: '#f0f9ff', padding: '5px 10px', borderRadius: '8px', fontSize: '0.8rem' }}><i className="fa-solid fa-droplet mr-2"></i>Water</span>}
              </div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0' }}>{room.location}</h4>
              <p style={{ color: '#10b981', fontSize: '1.6rem', fontWeight: '900', margin: '8px 0' }}>Rs. {room.price}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '1.8rem' }}>
                <a href={`https://wa.me/977${room.contact}`} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', background: '#22c55e', color: 'white', padding: '1rem', borderRadius: '16px', textDecoration: 'none', fontWeight: '700' }}>WhatsApp</a>
                <a href={`tel:${room.contact}`} style={{ background: '#f1f5f9', color: '#1e293b', width: '55px', height: '55px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><i className="fa-solid fa-phone"></i></a>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER SECTION */}
      <footer id="contact" style={{ background: '#0f172a', color: 'white', padding: '5rem 8% 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>GharBada</h4>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.9rem' }}>Making room hunting in Nepal easy, transparent, and fast. Built for students and professionals.</p>
          </div>
          <div>
            <h5 style={{ marginBottom: '1.2rem' }}>Quick Links</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#home" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Home</a>
              <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</a>
              <a href="#rooms" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Available Rooms</a>
            </div>
          </div>
          <div>
            <h5 style={{ marginBottom: '1.2rem' }}>Contact Us</h5>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Email: support@gharbada.com</p>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Phone: +977 9809109311 </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '1.5rem', fontSize: '1.2rem' }}>
              <i className="fa-brands fa-facebook" style={{ cursor: 'pointer' }}></i>
              <i className="fa-brands fa-instagram" style={{ cursor: 'pointer' }}></i>
              <i className="fa-brands fa-linkedin" style={{ cursor: 'pointer' }}></i>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          © 2026 GharBada Nepal. All rights reserved. Built with ❤️ for Nepal.
        </div>
      </footer>

      {/* MODAL (UNCHANGED) */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ background: 'white', width: '90%', maxWidth: '450px', borderRadius: '32px', padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Post New Listing</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ border: '2px dashed #e2e8f0', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="up" />
                <label htmlFor="up" style={{ cursor: 'pointer', color: '#4f46e5', fontWeight: '800' }}>{formData.image ? "Photo Added ✓" : "Upload Property Photo"}</label>
              </div>
              <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <input type="number" placeholder="Price (Rs.)" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <input type="text" placeholder="Contact Number" value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} required style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '0.85rem' }}><input type="checkbox" onChange={(e) => setFormData({...formData, amenities: {...formData.amenities, wifi: e.target.checked}})} /> WiFi</label>
                <label style={{ fontSize: '0.85rem' }}><input type="checkbox" onChange={(e) => setFormData({...formData, amenities: {...formData.amenities, water: e.target.checked}})} /> Water</label>
                <label style={{ fontSize: '0.85rem' }}><input type="checkbox" onChange={(e) => setFormData({...formData, amenities: {...formData.amenities, parking: e.target.checked}})} /> Parking</label>
              </div>

              <button type="submit" style={{ background: '#1e1b4b', color: 'white', padding: '1.2rem', border: 'none', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', marginTop: '1rem' }}>Publish Property</button>
              <button type="button" onClick={() => setShowModal(false)} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;