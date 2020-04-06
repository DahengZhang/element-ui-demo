<template>
    <div class="json-demos">
        JSON
        <pre ref="preEl"></pre>
        <pre ref="preEl2"></pre>
        <textarea v-model="pre"></textarea>
    </div>
</template>

<script>
import formatJSONIndnt from '../assets/json2html'

export default {
    name: 'JsonDemos',
    data: () => ({
        pre: ''
    }),
    mounted () {
        this.$refs.preEl.innerHTML = formatJSONIndnt(JSON.stringify({
            name: 'anran758',
            avatar: 'https://xxx',
            detail: JSON.stringify({
                desc: 'some description',
                level: 2,
            })
        }))

        this.$refs.preEl2.innerHTML = JSON.stringify({
            name: 'anran758',
            avatar: 'https://xxx',
            detail: {
                desc: 'some description',
                level: 2,
            }
        }, null, 4);

        this.pre = JSON.stringify({
            name: 'anran758',
            avatar: 'https://xxx',
            detail: {
                desc: 'some description',
                level: 2,
            }
        }, null, 4);
    }
}
</script>
