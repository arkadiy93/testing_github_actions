#!/bin/bash

# Generate config.js with environment variables
cat <<EOT > ./env.js
window._env_ = {
  REACT_APP_API_URL: '$REACT_APP_API_URL',
};
EOT
