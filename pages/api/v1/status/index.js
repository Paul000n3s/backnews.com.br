function status(request, response) {
  response.status(200).json({ frase: "Aprendendo sobre API's" });
}

export default status;
