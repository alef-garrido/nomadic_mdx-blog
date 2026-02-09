'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Card, Skeleton, Button } from '@heroui/react';
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';

export default function LeadDetailPage() {
  const params = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLead = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/leads/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch lead');
      const data = await response.json();
      setLead(data);
    } catch {
      setError('Failed to load lead');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
        <div className="max-w-2xl">
          <Skeleton className="h-32 rounded-lg mb-6" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
        <Card className="bg-slate-800 border border-slate-700 p-6">
          <p className="text-slate-300">Lead not found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          isIconOnly
          variant="light"
          as="a"
          href="/admin/leads"
          className="mb-6 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {error && (
          <Card className="mb-6 bg-red-500/10 border border-red-500/30 p-4">
            <p className="text-red-400">{error}</p>
          </Card>
        )}

        <Card className="bg-slate-800 border border-slate-700 p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{lead?.name || 'Unknown'}</h1>
              <p className="text-slate-400 text-sm">Lead ID: {params.id}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-white">{lead?.email || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="text-white">{lead?.phone || 'N/A'}</p>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Date Created</p>
                  <p className="text-white">{new Date(lead?.createdAt).toLocaleDateString() || 'N/A'}</p>
                </div>
              </div>
            </div>

            {lead?.message && (
              <div className="pt-4 border-t border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Message</p>
                <p className="text-white whitespace-pre-wrap">{lead.message}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
