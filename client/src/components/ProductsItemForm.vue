<template>
  <base-textbox
    label="Name"
    id="name"
    :error="errors.name"
    v-model="formName"
    @remove-error="removeError('name')"
  ></base-textbox>
  <base-textbox
    label="Kürzel"
    id="tag"
    :error="errors.tag"
    error-message="Das Kürzel muss zwischen 1 und 4 Zeichen lang sein."
    v-model="formTag"
    @remove-error="removeError('tag')"
  ></base-textbox>
  <base-textbox
    label="Beschreibung"
    id="description"
    type="textarea"
    v-model="formDescription"
  ></base-textbox>
  <base-textbox
    label="Verkaufspreis (€)"
    id="price"
    :error="errors.price"
    v-model="formPrice"
    @remove-error="removeError('price')"
  ></base-textbox>
  <base-textbox
    label="Sorten (kommagetrennt)"
    id="variations"
    :error="errors.variations"
    error-message="Bitte gebe mindestens zwei Sorten ein."
    v-model="formVariations"
    @remove-error="removeError('variations')"
  ></base-textbox>
  <base-button :loading="buttonLoading" @click="submitForm"
    >Bestätigen</base-button
  >
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: "edit",
      validator(value) {
        return ["edit", "new"].includes(value);
      },
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    variations: {
      type: Array,
      required: true,
    },
  },
  emits: ["form-success", "form-failed"],
  data() {
    return {
      formName: "",
      formDescription: "",
      formTag: "",
      formPrice: "",
      formVariations: "",
      errors: {
        name: false,
        tag: false,
        price: false,
        variations: false,
      },
      buttonLoading: false,
    };
  },
  methods: {
    removeError(field) {
      this.errors[field] = false;
    },
    validateForm() {
      if (!this.formName) {
        this.errors.name = true;
      }
      if (!this.formTag || this.formTag.length > 4) {
        this.errors.tag = true;
      }
      const formattedPrice = Number(this.formPrice.replaceAll(",", "."));
      if (!formattedPrice) {
        this.errors.price = true;
      }
      const formattedVariations = this.formVariations.trim().length
        ? this.formVariations.split(",").map((variation) => {
            return variation.trim();
          })
        : [];
      if (formattedVariations.length === 1) {
        this.errors.variations = true;
      }
      const { name, tag, description, price, variations } = this.errors;
      return !name && !tag && !description && !price && !variations
        ? {
            name: this.formName,
            tag: this.formTag,
            description: this.formDescription,
            price: formattedPrice,
            variations: formattedVariations,
          }
        : false;
    },
    submitForm() {
      const formData = this.validateForm();
      if (!formData) {
        return;
      }
      const url =
        this.mode === "edit"
          ? `${process.env.VUE_APP_API}/products/${this.id}`
          : `${process.env.VUE_APP_API}/products`;
      const options = {
        method: this.mode === "edit" ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      this.buttonLoading = true;
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            this.$emit("form-success", this.id || res._id, formData);
          } else {
            this.$emit("form-failed", res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
  },
  mounted() {
    this.formName = this.name;
    this.formDescription = this.description;
    this.formTag = this.tag;
    this.formPrice = this.price.toString();
    this.formVariations = this.variations.join(", ");
  },
};
</script>
