import { TouchableOpacity, View, Text } from 'react-native'
import { DuoInfo } from '../DuoInfo'

import { THEME } from '../../theme'
import { styles } from './styles'
import { GameController } from 'phosphor-react-native'

export interface DuoCardProps {
  hourEnd: string
  hourStart: string
  id: string
  name: string
  useVoiceChannel: boolean
  weekDays: string[]
  yearsPlaying: number
}

interface Props {
  data: DuoCardProps
  onConnect: () => void
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Name" value={data.name} />
      <DuoInfo
        label="Experience"
        value={
          data.yearsPlaying === 1
            ? `${data.yearsPlaying} year`
            : data.yearsPlaying
            ? `${data.yearsPlaying} years`
            : `I'm a noob 🤓`
        }
      />
      <DuoInfo
        label="Availability"
        value={
          data.weekDays.length === 1
            ? `${data.weekDays.length} day \u2022 ${data.hourStart} - ${data.hourEnd}`
            : `${data.weekDays.length} days \u2022 ${data.hourStart} - ${data.hourEnd}`
        }
      />
      <DuoInfo
        label="Voice Chat Enabled?"
        value={data.useVoiceChannel ? 'Yes' : 'No'}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController size={20} color={THEME.COLORS.TEXT} />
        <Text style={styles.buttonTitle}>Connect</Text>
      </TouchableOpacity>
    </View>
  )
}
