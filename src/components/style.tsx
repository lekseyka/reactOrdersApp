import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    components: {
        FormLabel: {
            variants: {
                'form-input': {
                    mt: '10px',
                    color: '#595B83',
                    fontSize: '14px',
                }
            }
        },
        Text: {
            variants: {
                'form-text': {
                    color: '#595B83',
                    fontWeight: '500',
                    fontSize: 'lg',
                },
            }
        }
    },
})

export default theme