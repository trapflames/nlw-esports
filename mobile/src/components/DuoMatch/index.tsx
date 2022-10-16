import { useState } from 'react'
import {
  Modal,
  ModalProps,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Check, CheckCircle, Copy } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles'
import { THEME } from '../../theme'
import { Heading } from '../Heading'

interface Props extends ModalProps {
  discord: string
  onClose: () => void
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  async function handleCopyDiscordToClipboard() {
    await Clipboard.setStringAsync(discord)
    setIsCopying(true)

    await sleep(300)

    // Alert.alert('Done!', 'You can now paste the discord of your duo!')

    setIsCopying(false)
    setIsCopied(true)
  }

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              setIsCopied(false)
              onClose()
            }}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <View style={styles.block}>
            <CheckCircle color={THEME.COLORS.SUCCESS} size={64} weight="bold" />
            <Heading
              title="Let's play!"
              subtitle={'Your duo is waiting for you!'}
              style={{ alignItems: 'center', marginTop: 24 }}
            />
            <Text style={styles.label}>Add on Discord</Text>

            <TouchableOpacity
              style={styles.discordButton}
              onPress={() => handleCopyDiscordToClipboard()}
              disabled={isCopied}
            >
              <View style={styles.separator} />
              <Text numberOfLines={1} style={styles.discord}>
                {isCopying ? (
                  <ActivityIndicator color={THEME.COLORS.PRIMARY} />
                ) : (
                  <Text
                    style={isCopied ? { color: THEME.COLORS.CAPTION_500 } : {}}
                  >
                    {discord}
                  </Text>
                )}
              </Text>

              {isCopied ? (
                <Check
                  size={THEME.FONT_SIZE.LG - 4}
                  color={THEME.COLORS.SUCCESS}
                  style={{ marginLeft: 20 }}
                />
              ) : (
                <Copy
                  size={THEME.FONT_SIZE.LG - 4}
                  style={{ marginLeft: 20 }}
                  color={THEME.COLORS.CAPTION_500}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
