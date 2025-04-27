"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Navbar from '../components/Navbar';


export default function History() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('${process.env.NEXT_PUBLIC_API_BASE_URL}/api/list/');
        setUrls(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Container maxWidth="md" className="py-8">
        <Paper className="p-6">
          <Typography variant="h4" component="h1" gutterBottom className="mb-6">
            URL History
          </Typography>
          
          {loading ? (
            <Typography>Loading...</Typography>
          ) : urls.length === 0 ? (
            <Typography>No URLs have been shortened yet.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Original URL</TableCell>
                    <TableCell>Short URL</TableCell>
                    <TableCell>Clicks</TableCell>
                    <TableCell>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urls.map((url) => (
                    <TableRow key={url.id}>
                      <TableCell>
                        <a href={url.original_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {url.original_url}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={`http://localhost:3000/${url.short_code}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {url.short_code}
                        </a>
                      </TableCell>
                      <TableCell>{url.clicks}</TableCell>
                      <TableCell>{new Date(url.created_at).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </div>
  );
}