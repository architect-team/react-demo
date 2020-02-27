<template>
  <ContentWrapper :gutters="2">
    <v-layout
      column
      justify-center
      align-center
    >
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">
            Submit ID for authentication
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-file-input v-model="document_front" label="Front"></v-file-input>
              </v-col>
              <v-col cols="6">
                <v-file-input v-model="document_back" label="Back"></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="light-blue"
              nuxt
              :disabled="!(document_front && document_back)"
              @click="submitDocument"
              class="white-text"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mt-4">
          <v-card-title class="headline">
            Authentication Results
            <v-spacer/>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="table_documents"
            :items-per-page="10"
            class="elevation-1 mt-4"
          >
            <template v-slot:item.action="{ item }">
              <div class="text-right">
                <v-btn
                  text small color="light-blue" :to="{
                  name: 'document',
                  params: {
                    id: item.id,
                  },
                }">
                  Review
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-snackbar
        v-model="show_snackbar"
        color="success"
      >
        Authentication successful
        <v-btn
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-layout>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from './../components/content-wrapper';

export default {
  components: {
    ContentWrapper
  },

  async asyncData ({ app }) {
    const documents = (await app.$axios.get('/api/documents')).data;
    return { documents };
  },

  data () {
    const headers = [
      { text: 'ID', value: 'id' },
      { text: 'Class', value: 'class' },
      { text: 'Name', value: 'name' },
      { text: 'ESF', value: 'esf' },
      { text: 'Pattern Match Score', value: 'pattern_match' },
      { text: 'Score', value: 'overall_score' },
      { text: '', value: 'action', sortable: false, align: 'right' }
    ];

    return {
      // last_result: null,
      headers, documents: [],
      table_documents: [],
      document_front: null,
      document_back: null,
      show_snackbar: false
    };
  },

  mounted() {
    this.getRelevantDocumentDetails();
  },

  methods: {
    async submitDocument () {
      const form_data = new FormData();
      form_data.append('front', this.document_front);
      form_data.append('back', this.document_back);

      const res = await this.$axios.post('/api/document', form_data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // this.last_result = res;
      this.documents.push(res.data);
      this.getRelevantDocumentDetails();
      this.show_snackbar = true;
      setTimeout(() => {
        this.show_snackbar = false;
      }, 3000);
    },

    getRelevantDocumentDetails() {
      this.table_documents = this.documents.map(document => {
        return {
          id: document.id,
          class: document.result.classifier.front,
          name: `${document.result.ocr.firstName} ${document.result.ocr.lastName}`,
          esf: document.result.esf.status,
          pattern_match: document.result.patternMatch.match,
          overall_score: document.result.overallScore
        };
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.white-text {
  color: white !important;
}
</style>
