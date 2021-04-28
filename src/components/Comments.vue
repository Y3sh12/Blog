<template>
  <div class="ui teal segment">
    <div class="ui comments">
      <h4 class="ui dividing header">Comments</h4>
      <div class="comment">
        <a class="avatar">
          <img src="@/assets/upload/avatar.jpg" />
        </a>
        <div class="content">
          <a class="author">Matt</a>
          <div class="metadata">
            <span class="date">今天下午 5:42</span>
          </div>
          <div class="text">太赞了！</div>
          <div class="actions">
            <a class="reply">回复</a>
          </div>
        </div>
      </div>
      <div class="comment">
        <a class="avatar">
          <img src="https://picsum.photos/id/20/100/100" />
        </a>
        <div class="content">
          <a class="author">Elliot Fu</a>
          <div class="metadata">
            <span class="date">昨天上午12:30</span>
          </div>
          <div class="text">
            <p>這對我的研究是非常有用.謝謝!</p>
          </div>
          <div class="actions">
            <a class="reply">回复</a>
          </div>
        </div>
        <div class="comments">
          <div class="comment">
            <a class="avatar">
              <img src="https://picsum.photos/id/20/100/100" />
            </a>
            <div class="content">
              <a class="author">Jenny Hess</a>
              <div class="metadata">
                <span class="date">刚刚</span>
              </div>
              <div class="text">秀</div>
              <div class="actions">
                <a class="reply">回复</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment">
        <a class="avatar">
          <img src="https://picsum.photos/id/20/100/100" />
        </a>
        <div class="content">
          <a class="author">Joe Henderson</a>
          <div class="metadata">
            <span class="date">5 天以前</span>
          </div>
          <div class="text">老兄，这太棒了。非常感谢。</div>
          <div class="actions">
            <a class="reply">回复</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.ui.comments {
  max-width: 100%;
}
</style>