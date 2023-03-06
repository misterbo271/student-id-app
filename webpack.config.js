const path = require('path');

module.exports = {
    resolve: {
        alias: {
            'app': path.resolve(__dirname, './student-id-app'),
            'abilities': path.resolve(__dirname, './student-id-app/abilities'),
            'assets': path.resolve(__dirname, './student-id-app/assets'),
            'caches': path.resolve(__dirname, './student-id-app/caches'),
            'components': path.resolve(__dirname, './student-id-app/components'),
            'configs': path.resolve(__dirname, './student-id-app/configs'),
            'constants': path.resolve(__dirname, './student-id-app/constants'),
            'controls': path.resolve(__dirname, './student-id-app/controls'),
            'databases': path.resolve(__dirname, './student-id-app/databases'),
            'globals': path.resolve(__dirname, './student-id-app/globals'),
            'handlers': path.resolve(__dirname, './student-id-app/handlers'),
            'helpers': path.resolve(__dirname, './student-id-app/helpers'),
            'hooks': path.resolve(__dirname, './student-id-app/hooks'),
            'modules': path.resolve(__dirname, './student-id-app/modules'),
            'screens': path.resolve(__dirname, './student-id-app/screens'),
            'services': path.resolve(__dirname, './student-id-app/services'),
            'stores': path.resolve(__dirname, './student-id-app/stores'),
            'utils': path.resolve(__dirname, './student-id-app/utils')
        }
    }
};
