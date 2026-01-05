import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building2, Star, MapPin, Clock, Phone, Check, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';

const PharmacyPage = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const pharmacies = [
    {
      id: 1,
      name: 'HealthPlus Pharmacy',
      rating: 4.8,
      reviews: 1243,
      distance: '0.5 miles',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      hours: 'Open 24/7',
      verified: true,
      discount: '15% off first order',
      deliveryTime: '30-45 min',
    },
    {
      id: 2,
      name: 'QuickCare Pharmacy',
      rating: 4.6,
      reviews: 856,
      distance: '1.2 miles',
      address: '456 Oak Ave, Midtown',
      phone: '(555) 234-5678',
      hours: '8 AM - 10 PM',
      verified: true,
      discount: '10% off orders over $50',
      deliveryTime: '45-60 min',
    },
    {
      id: 3,
      name: 'MediCare Express',
      rating: 4.9,
      reviews: 2156,
      distance: '2.3 miles',
      address: '789 Pine Rd, Uptown',
      phone: '(555) 345-6789',
      hours: 'Open 24/7',
      verified: true,
      discount: 'Free delivery over $30',
      deliveryTime: '60-90 min',
    },
    {
      id: 4,
      name: 'Community Pharmacy',
      rating: 4.7,
      reviews: 634,
      distance: '3.1 miles',
      address: '321 Elm St, Westside',
      phone: '(555) 456-7890',
      hours: '9 AM - 9 PM',
      verified: true,
      discount: '20% senior discount',
      deliveryTime: '90-120 min',
    },
  ];

  const handleSelectPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    toast({
      title: 'Pharmacy selected!',
      description: `You selected ${pharmacy.name}. Proceeding to checkout...`,
    });
    
    setTimeout(() => {
      toast({
        title: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀',
      });
    }, 1500);
  };

  return (
    <div>
      <Helmet>
        <title>Select Pharmacy - MediCare</title>
        <meta name="description" content="Choose from verified pharmacies near you for safe and convenient medication delivery." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Select Pharmacy</h1>
          <p className="text-gray-600">Choose from verified pharmacies near you</p>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 font-semibold">Interactive Map</p>
              <p className="text-sm text-gray-600">Showing pharmacies near you</p>
            </div>
          </div>
        </motion.div>

        {/* Pharmacy List */}
        <div className="grid md:grid-cols-2 gap-6">
          {pharmacies.map((pharmacy, index) => (
            <motion.div
              key={pharmacy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 ${
                selectedPharmacy?.id === pharmacy.id
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{pharmacy.name}</h3>
                    {pharmacy.verified && (
                      <div className="bg-blue-100 text-blue-700 p-1 rounded-full">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{pharmacy.rating}</span>
                    <span className="text-gray-500">({pharmacy.reviews} reviews)</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {pharmacy.distance}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{pharmacy.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{pharmacy.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{pharmacy.hours}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 bg-blue-50 p-3 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-semibold text-blue-900">{pharmacy.discount}</span>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                Delivery: <span className="font-semibold text-gray-900">{pharmacy.deliveryTime}</span>
              </div>

              <Button
                onClick={() => handleSelectPharmacy(pharmacy)}
                className={`w-full ${
                  selectedPharmacy?.id === pharmacy.id
                    ? 'bg-gradient-to-r from-blue-500 to-green-500'
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {selectedPharmacy?.id === pharmacy.id ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Selected
                  </>
                ) : (
                  'Select Pharmacy'
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Pharmacies?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="bg-white p-1 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Partners</h3>
              <p className="text-sm text-gray-600">All pharmacies are licensed and verified</p>
            </div>
            <div>
              <div className="bg-white p-1 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">Competitive pricing and special discounts</p>
            </div>
            <div>
              <div className="bg-white p-1 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick and reliable medication delivery</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PharmacyPage;