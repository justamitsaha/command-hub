#!/bin/sh

# Generate config.js from environment variables
cat > /usr/share/nginx/html/config.js << EOF
window.APP_CONFIG = {
  urlMap: ${URL_MAP:-'{}'},
  commandSections: ${COMMAND_SECTIONS:-'[]'}
};
EOF

echo "Generated config.js with environment variables"
