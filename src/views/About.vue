<template>
  <div class="about">
    <div class="content">
      <div class="container">
        <div class="py-3 py-lg-6">
          <ul
            class="nav nav-steps nav-steps-circles flex-column flex-lg-row justify-content-around w-80 mx-auto"
          >
            <li class="nav-item">
              <a href="#tab-steps1" class="nav-link active" data-toggle="tab">
                <span class="font-weight-bold d-block">Step 1:</span>
                <span>Ready</span>
              </a>
              </a>
            </li>
            <li class="nav-item">
              <a href="#tab-steps2" class="nav-link" data-toggle="tab">
                <span class="font-weight-bold d-block">Step 2:</span>
                <span>Set</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#tab-steps3" class="nav-link" data-toggle="tab">
                <span class="font-weight-bold d-block">Step 3:</span>
                <span>Launder</span>
              </a>
            </li>
          </ul>
          <div class="tab-content text-center pb-2 px-md-6">
            <div
              class="tab-pane fade active show w-lg-70 mx-lg-auto"
              id="tab-steps1"
            >
              <img class="nav-steps-circles" src="/assets/img/laundry/careTag.jpg" />
              <h3 class="op-8">
                Ready
              </h3>
              <p class="text-black-50">
                Add clothing items to account. Record wash and dry settings by
                inspecting item care labels for wash and dry setting icons.
              </p>
            </div>
            <div class="tab-pane fade w-lg-70 mx-lg-auto" id="tab-steps2">
              <img src="/assets/img/laundry/Set.jpg">
              <h3 class="op-8">
                Set
              </h3>
              <p class="text-black-50">
                Select items that require washing to add to a wash list labeled
                by setting.
              </p>
            </div>
            <div class="tab-pane fade w-lg-70 mx-lg-auto" id="tab-steps3">
              <img src="/assets/img/laundry/Launder.jpg">
              <h3 class="op-8">
                Launder
              </h3>
              <p class="text-black-50">
                Generate laundry loads and track their status through washing,
                drying and folding stages.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  img {
    margin-bottom: 20px; 
  }

</style>
