import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Produtos() {
    return (
        <View>
            <Text>Produtos</Text>

            <Link href="../produto/novo">
                <Text>+ Novo Produto</Text>
            </Link>
        </View>
    );
}
