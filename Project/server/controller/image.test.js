const { uploadImage } = require("./image");

// test passed case
//jest.fn() to create a mock function for testing
jest.mock("../library/cloudinary", () => ({
  uploader: {
    upload: jest.fn(() =>
      Promise.resolve({
        public_id: "test-public-id",
        secure_url:
          "https://hips.hearstapps.com/hmg-prod/images/little-cute-maltipoo-puppy-royalty-free-image-1652926025.jpg?crop=0.444xw:1.00xh;0.129xw,0&resize=980:*",
      })
    ),
  },
}));

describe("uploadImage function", () => {
  it("should upload an image and return the public ID and URL", async () => {
    const req = {
      file: {
        path: "/path/https://hips.hearstapps.com/hmg-prod/images/little-cute-maltipoo-puppy-royalty-free-image-1652926025.jpg?crop=0.444xw:1.00xh;0.129xw,0&resize=980:*",
      },
    };
    const res = {
      json: jest.fn(),
    };
    await uploadImage(req, res);
    expect(res.json).toHaveBeenCalledWith({
      public_id: "test-public-id",
      url: "https://hips.hearstapps.com/hmg-prod/images/little-cute-maltipoo-puppy-royalty-free-image-1652926025.jpg?crop=0.444xw:1.00xh;0.129xw,0&resize=980:*",
    });
  });

  it("should return errors when uploading an image", async () => {
    const req = {
      file: {
        path: "/path/https://hips.hearstapps.com/hmg-prod/images/little-cute-maltipoo-puppy-royalty-free-image-1652926025.jpg?crop=0.444xw:1.00xh;0.129xw,0&resize=980:*",
      },
    };
    const res = {
      status: jest.fn(() => ({
        json: jest.fn(),
      })),
    };
    await uploadImage(req, res);
    expect.stringContaining("Test error message");
  });
});
