"use client"

import React from 'react'

export default function HomePage() {
	return (
		<>
			<style jsx global>{`
				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}

				body {
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
					background: #f8f9fa;
					color: #333;
				}

				.hero {
					background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
					color: white;
					min-height: 100vh;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					padding: 40px 20px;
					position: relative;
					overflow: hidden;
				}

				.hero::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
					opacity: 0.3;
				}

				.logo-hero {
					width: 450px;
					height: 220px;
					margin: 0 auto 30px;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 20px;
					background: #ffffff;
					border-radius: 25px;
					box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
					backdrop-filter: blur(10px);
					border: 1px solid rgba(255, 255, 255, 0.3);
					transition: all 0.3s ease;
				}

				.logo-hero:hover {
					transform: translateY(-3px);
					box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
				}

				.emoji-hero {
					width: 120px;
					height: 120px;
					margin: 0 auto 20px;
					background: rgba(255, 255, 255, 0.1);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 60px;
					backdrop-filter: blur(10px);
					border: 3px solid rgba(255, 255, 255, 0.2);
					animation: pulse 2s infinite;
				}

				@keyframes pulse {
					0%, 100% { transform: scale(1); }
					50% { transform: scale(1.05); }
				}

				.hero h1 {
					font-size: 48px;
					font-weight: 700;
					margin-bottom: 20px;
					text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
				}

				.hero h2 {
					font-size: 36px;
					font-weight: 600;
					margin-bottom: 20px;
					color: #fbbf24;
				}

				.tagline {
					font-size: 20px;
					margin-bottom: 40px;
					opacity: 0.95;
					line-height: 1.6;
				}

				.btn-custom-primary {
					background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
					color: #1e3a8a;
					box-shadow: 0 6px 25px rgba(251, 191, 36, 0.5);
					font-size: 20px;
					font-weight: 700;
					padding: 18px 45px;
					border-radius: 50px;
					text-decoration: none;
					display: inline-flex;
					align-items: center;
					transition: all 0.3s ease;
					border: none;
					text-transform: uppercase;
					letter-spacing: 0.5px;
				}

				.btn-custom-primary:hover {
					transform: translateY(-4px) scale(1.02);
					box-shadow: 0 10px 35px rgba(251, 191, 36, 0.7);
					background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
				}

				.btn-custom-secondary {
					background: rgba(255, 255, 255, 0.15);
					color: white;
					border: 3px solid white;
					backdrop-filter: blur(15px);
					font-size: 20px;
					font-weight: 700;
					padding: 18px 45px;
					border-radius: 50px;
					text-decoration: none;
					display: inline-flex;
					align-items: center;
					transition: all 0.3s ease;
					text-transform: uppercase;
					letter-spacing: 0.5px;
				}

				.btn-custom-secondary:hover {
					background: white;
					color: #1e3a8a;
					transform: translateY(-4px) scale(1.02);
					box-shadow: 0 10px 35px rgba(255, 255, 255, 0.4);
				}

				.section-title {
					text-align: center;
					font-size: 36px;
					font-weight: 700;
					margin-bottom: 60px;
					color: #1e3a8a;
				}

				.feature-card {
					background: #f8f9fa;
					padding: 40px 30px;
					border-radius: 20px;
					text-align: center;
					transition: all 0.3s ease;
					border: 2px solid transparent;
					height: 100%;
				}

				.feature-card:hover {
					transform: translateY(-10px);
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
					border-color: #3b82f6;
				}

				.feature-icon {
					width: 80px;
					height: 80px;
					margin: 0 auto 20px;
					background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
					border-radius: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 40px;
				}

				.feature-title {
					font-size: 22px;
					font-weight: 600;
					margin-bottom: 15px;
					color: #1e3a8a;
				}

				.feature-desc {
					color: #666;
					line-height: 1.6;
				}

				.product-card {
					background: white;
					border-radius: 20px;
					overflow: hidden;
					box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
					transition: all 0.3s ease;
					height: 100%;
				}

				.product-card:hover {
					transform: translateY(-10px);
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
				}

				.product-header {
					background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
					color: white;
					padding: 30px 20px;
					text-align: center;
				}

				.product-name {
					font-size: 24px;
					font-weight: 700;
					margin-bottom: 10px;
				}

				.contact-card {
					background: rgba(255, 255, 255, 0.95);
					padding: 40px 30px;
					border-radius: 20px;
					box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
					transition: all 0.3s ease;
					height: 100%;
				}

				.contact-card:hover {
					transform: translateY(-5px);
					box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
				}

				.contact-card h3 {
					color: #1e3a8a;
					font-size: 24px;
					font-weight: 700;
					margin-bottom: 25px;
					padding-bottom: 15px;
					border-bottom: 3px solid #fbbf24;
				}

				@media (max-width: 768px) {
					.logo-hero {
						width: 280px;
						height: 180px;
					}
					.hero h1 {
						font-size: 32px;
					}
					.hero h2 {
						font-size: 24px;
					}
					.section-title {
						font-size: 28px;
					}
				}
			`}</style>

			{/* Hero Section */}
			<section className="hero">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-10 text-center" style={{ position: 'relative', zIndex: 1 }}>
							<div className="logo-hero mx-auto">
								<img src="/k-energy-save-logo.jpg" alt="K Energy Save" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
							</div>
							<div className="emoji-hero mx-auto">⚡</div>
							<h1>ENERGY YOU CAN TRUST</h1>
							<h2>&quot;SAVINGS&quot; YOU CAN SEE</h2>
							<p className="tagline">
								Cut your Electric Bill from day one!<br />
								Advanced power-saving technology with proven results
							</p>
							<div className="d-flex gap-3 justify-content-center flex-wrap">
								<a href="https://strong-dory-enabled.ngrok-free.app/main-login" className="btn-custom-primary">
									🚀 Login to monitoring
								</a>
								<a href="#products" className="btn-custom-secondary">
									📦 View Products
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-5 bg-light">
				<div className="container py-5">
					<h2 className="section-title">Why Choose K Energy Save?</h2>
					<div className="row g-4">
						<div className="col-md-6 col-lg-4">
							<div className="feature-card">
								<div className="feature-icon">🔬</div>
								<h3 className="feature-title">Proven Technology</h3>
								<p className="feature-desc">Validated power saving device with global exports. Certified, eco-friendly, and patented solutions.</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="feature-card">
								<div className="feature-icon">🌿</div>
								<h3 className="feature-title">Eco Friendly</h3>
								<p className="feature-desc">Environmentally conscious solutions that reduce carbon footprint while saving energy.</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="feature-card">
								<div className="feature-icon">⚡</div>
								<h3 className="feature-title">Power Quality</h3>
								<p className="feature-desc">Improves power quality and system reliability, extending equipment lifespan.</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="feature-card">
								<div className="feature-icon">✅</div>
								<h3 className="feature-title">Certified Reliability</h3>
								<p className="feature-desc">Patented solutions trusted across industrial and commercial sectors worldwide.</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="feature-card">
								<div className="feature-icon">🌍</div>
								<h3 className="feature-title">Global Impact</h3>
								<p className="feature-desc">Exported power-saving devices benefiting multiple countries internationally.</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="feature-card">
								<div className="feature-icon">💰</div>
								<h3 className="feature-title">7-15% Savings</h3>
								<p className="feature-desc">Reduces power consumption by blocking excess power and improving efficiency.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Products Section */}
			<section id="products" className="py-5">
				<div className="container py-5">
					<h2 className="section-title">Our Products</h2>
					<div className="row g-4">
						<div className="col-md-6 col-lg-4">
							<div className="product-card">
								<div className="product-header">
									<h3 className="product-name">K-SAVER 10</h3>
									<p className="mb-0">Residential Solution</p>
								</div>
								<img src="/k-saver-10.png" alt="K-SAVER 10" style={{ width: '100%', height: '350px', objectFit: 'contain', padding: '20px', background: '#f8f9fa' }} />
								<div className="p-4 text-center">
									<p className="mb-3">Perfect for homes and small offices</p>
									<p className="text-muted mb-0">Up to 10kW capacity</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="product-card">
								<div className="product-header">
									<h3 className="product-name">K-SAVER 30</h3>
									<p className="mb-0">Commercial Solution</p>
								</div>
								<img src="/k-saver-30.png" alt="K-SAVER 30" style={{ width: '100%', height: '350px', objectFit: 'contain', padding: '20px', background: '#f8f9fa' }} />
								<div className="p-4 text-center">
									<p className="mb-3">Ideal for commercial spaces</p>
									<p className="text-muted mb-0">Up to 30kW capacity</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="product-card">
								<div className="product-header">
									<h3 className="product-name">K-SAVER Max</h3>
									<p className="mb-0">Industrial Solution</p>
								</div>
								<img src="/k-saver-max.png" alt="K-SAVER Max" style={{ width: '100%', height: '350px', objectFit: 'contain', padding: '20px', background: '#f8f9fa' }} />
								<div className="p-4 text-center">
									<p className="mb-3">High-capacity industrial applications</p>
									<p className="text-muted mb-0">Customizable capacity</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-5" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
				<div className="container py-5">
					<h2 className="section-title text-white">Contact Us</h2>
					<div className="row g-4">
						<div className="col-lg-6">
							<div className="contact-card">
								<h3>🇹🇭 Thailand Office</h3>
								<p><strong>Address:</strong><br />123/45 Energy Tower, Bangkok 10110</p>
								<p><strong>Phone:</strong> <a href="tel:+66123456789">+66 12 345 6789</a></p>
								<p><strong>Email:</strong> <a href="mailto:thailand@kenergy-save.com">thailand@kenergy-save.com</a></p>
								<p><strong>Hours:</strong> Mon-Fri 9:00-18:00</p>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="contact-card">
								<h3>🇰🇷 Korea Office</h3>
								<p><strong>Address:</strong><br />Seoul, South Korea</p>
								<p><strong>Phone:</strong> <a href="tel:+82123456789">+82 12 345 6789</a></p>
								<p><strong>Email:</strong> <a href="mailto:korea@kenergy-save.com">korea@kenergy-save.com</a></p>
								<p><strong>Hours:</strong> Mon-Fri 9:00-18:00</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-4" style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'center' }}>
				<div className="container">
					<p className="mb-2">&copy; 2025 K Energy Save Co., Ltd. All rights reserved.</p>
					<p className="mb-0">Powered by <a href="https://kenergy-save.com" style={{ color: '#fbbf24', textDecoration: 'none' }}>K Energy Save</a></p>
				</div>
			</footer>
		</>
	)
}
