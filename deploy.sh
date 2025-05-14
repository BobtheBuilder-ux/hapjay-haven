
#!/bin/bash

# Hostinger Deployment Script
# Make this script executable with: chmod +x deploy.sh

# Build the project
echo "Building project..."
npm run build

# Create a deployment directory if it doesn't exist
mkdir -p deployment

# Copy build files to the deployment directory
echo "Preparing files for deployment..."
cp -r dist/* deployment/

echo "Deployment package created in ./deployment directory"
echo "You can now upload the contents of the deployment directory to your Hostinger hosting account using FTP"
echo "If you have SSH access to your Hostinger account, you can also use the following command:"
echo "scp -r deployment/* username@yourhostinger.com:public_html/"

# Instructions for manual deployment
cat << EOF

==== HOSTINGER DEPLOYMENT INSTRUCTIONS ====

1. Log in to your Hostinger control panel
2. Go to File Manager or use FTP client like FileZilla
3. Navigate to your public_html directory (or subdirectory if needed)
4. Upload all files from the "deployment" folder
5. Ensure your domain is pointing to the correct directory
6. If using SPA routing (like React Router), you may need to set up URL rewriting

For URL rewriting, create a .htaccess file in your public_html directory with:

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

EOF
