export default function lazyloading (file) {
	return (resolve, reject) => {
		require.ensure(file, () => {
			log(`${file}: ${arguments}`)
		})
	}
}