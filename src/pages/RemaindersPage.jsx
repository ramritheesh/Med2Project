import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Bell, Plus, Trash2, Clock, Edit2, Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadReminders();
    window.addEventListener('remindersUpdated', loadReminders);
    return () => window.removeEventListener('remindersUpdated', loadReminders);
  }, []);

  const loadReminders = () => {
    const stored = JSON.parse(localStorage.getItem('medicationReminders') || '[]');
    setReminders(stored);
  };

  const toggleReminder = (id) => {
    const updated = reminders.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    setReminders(updated);
    localStorage.setItem('medicationReminders', JSON.stringify(updated));
    window.dispatchEvent(new Event('remindersUpdated'));
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('medicationReminders', JSON.stringify(updated));
    window.dispatchEvent(new Event('remindersUpdated'));
    toast({
      title: 'Reminder deleted',
      description: 'Medication reminder has been removed.',
    });
  };

  const addReminder = (newReminder) => {
    const reminder = {
      ...newReminder,
      id: Date.now(),
      enabled: true,
    };
    const updated = [...reminders, reminder];
    setReminders(updated);
    localStorage.setItem('medicationReminders', JSON.stringify(updated));
    window.dispatchEvent(new Event('remindersUpdated'));
    setShowAddForm(false);
    toast({
      title: 'Reminder created!',
      description: `Reminder set for ${reminder.medication}.`,
    });
  };

  const updateReminder = (id, updates) => {
    const updated = reminders.map(r =>
      r.id === id ? { ...r, ...updates } : r
    );
    setReminders(updated);
    localStorage.setItem('medicationReminders', JSON.stringify(updated));
    window.dispatchEvent(new Event('remindersUpdated'));
    setEditingId(null);
    toast({
      title: 'Reminder updated',
      description: 'Changes have been saved.',
    });
  };

  return (
    <div>
      <Helmet>
        <title>Medication Reminders - MediCare</title>
        <meta name="description" content="Never miss a dose with customizable medication reminders and schedules." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Medication Reminders</h1>
              <p className="text-gray-600">
                {reminders.filter(r => r.enabled).length} active reminder(s)
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </motion.div>

        {/* Add Reminder Form */}
        {showAddForm && (
          <ReminderForm
            onSave={addReminder}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Reminders List */}
        {reminders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <Bell className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No reminders yet</h2>
            <p className="text-gray-600 mb-6">Add medications from your cart or create custom reminders</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Reminder
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                {editingId === reminder.id ? (
                  <ReminderForm
                    initialData={reminder}
                    onSave={(updates) => updateReminder(reminder.id, updates)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          reminder.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                            reminder.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{reminder.medication}</h3>
                        <p className="text-gray-600">{reminder.dosage}</p>
                        <p className="text-sm text-gray-500 mt-1">{reminder.frequency}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {reminder.times.map((time, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                              <Clock className="h-3 w-3" />
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(reminder.id)}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ReminderForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      medication: '',
      dosage: '',
      frequency: 'Daily',
      times: ['09:00'],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.medication || !formData.dosage) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    onSave(formData);
  };

  const addTime = () => {
    setFormData({
      ...formData,
      times: [...formData.times, '12:00'],
    });
  };

  const updateTime = (index, value) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({ ...formData, times: newTimes });
  };

  const removeTime = (index) => {
    if (formData.times.length > 1) {
      setFormData({
        ...formData,
        times: formData.times.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-blue-50 rounded-xl p-6 mb-4"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Medication Name *
          </label>
          <input
            type="text"
            value={formData.medication}
            onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Aspirin"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Dosage *
          </label>
          <input
            type="text"
            value={formData.dosage}
            onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 100mg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Frequency
          </label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Daily</option>
            <option>Twice Daily</option>
            <option>Three Times Daily</option>
            <option>As Needed</option>
            <option>Weekly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Reminder Times
          </label>
          {formData.times.map((time, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="time"
                value={time}
                onChange={(e) => updateTime(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.times.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTime(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTime}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            + Add Time
          </button>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-green-500">
          <Save className="h-4 w-4 mr-2" />
          Save Reminder
        </Button>
        <Button type="button" onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </motion.form>
  );
};

export default RemindersPage;