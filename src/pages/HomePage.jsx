import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, ShoppingCart, Bell, Building2, Shield, Clock, Pill } from 'lucide-react';
import { Button } from '../components/ui/button';

const HomePage = () => {
  const features = [
    {
      icon: Upload,
      title: 'Upload Prescriptions',
      description: 'Easily upload prescription images or PDFs. Our AI reads and processes them instantly.',
      link: '/upload',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: ShoppingCart,
      title: 'Auto-Add to Cart',
      description: 'Medications are automatically added to your cart with detailed information.',
      link: '/cart',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss a dose with customizable medication reminders and schedules.',
      link: '/reminders',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Building2,
      title: 'Verified Pharmacies',
      description: 'Order from trusted, verified pharmacies with competitive pricing.',
      link: '/pharmacy',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const benefits = [
    { icon: Shield, text: 'Secure & Private' },
    { icon: Clock, text: '24/7 Available' },
    { icon: Pill, text: 'Medication Tracking' },
  ];

  return (
    <div>
      <Helmet>
        <title>MediCare - Your Digital Pharmacy Assistant</title>
        <meta name="description" content="Upload prescriptions, manage medications, set reminders, and order from verified pharmacies - all in one place." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Health,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Upload prescriptions, manage medications, and never miss a dose with our intelligent reminder system.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/upload">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Prescription
                  </Button>
                </Link>
                <Link to="/pharmacy">
                  <Button size="lg" variant="outline">
                    Browse Pharmacies
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 shadow-2xl">
                <img alt="Medical professional reviewing prescription on tablet" className="rounded-2xl shadow-lg" src="https://images.unsplash.com/photo-1666886573301-b5d526cfd518" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Four simple steps to better medication management</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Link to={feature.link}>
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 transition-all h-full group">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{benefit.text}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users managing their medications smarter and safer.
            </p>
            <Link to="/upload">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your First Prescription
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;