import { InvalidParamsException } from "@exceptions/InvalidParamsException";
import { PostCreateAttributes } from "@typings";

export class PostCreateDto implements PostCreateAttributes {
	public title: string;
	public authorId: number;
	public description: string;
	public imageSrc: string;

	private constructor(attributes: PostCreateAttributes) {
		this.title = attributes.title;
		this.authorId = attributes.authorId;
		this.description = attributes.description;
		this.imageSrc = attributes.imageSrc;
	}

	public static verify({
		authorId,
		description,
		title,
		imageSrc,
	}: PostCreateAttributes) {
		PostCreateDto.verifyDescription(description);
		PostCreateDto.verifyAuthorId(authorId);
		PostCreateDto.verifyTitle(title);
		PostCreateDto.verifyImageSrc(imageSrc);

		return new PostCreateDto({
			authorId,
			description,
			imageSrc,
			title,
		});
	}

	private static verifyDescription(description: string) {
		if (!description) {
			throw new InvalidParamsException("Description is required.");
		}
		if (description.length > 1024) {
			throw new InvalidParamsException(
				`Maximum of 1024 characters. ${description.length} was used.`
			);
		}
	}

	private static verifyAuthorId(authorId: number) {
		if (typeof authorId !== "number") {
			const value = parseInt(authorId);
			if (isNaN(value)) {
				throw new InvalidParamsException(`Invalid author ID.`);
			}
		}
	}

	private static verifyTitle(title: string) {
		if (!title) {
			throw new InvalidParamsException("Title is required.");
		} else if (title.length > 128) {
			throw new InvalidParamsException(
				`Maximum of 128 characters. ${title.length} was used.`
			);
		}
	}

	private static verifyImageSrc(imageSrc: string) {
		if (!imageSrc) {
			throw new InvalidParamsException("Image is required.");
		}
		if (imageSrc.length > 256) {
			throw new InvalidParamsException(
				`Maximum of 256 characters. ${imageSrc.length} was used.`
			);
		}
		PostCreateDto.checkAllowedImageHosts(imageSrc);
	}
	private static checkAllowedImageHosts(imageSrc: string) {
		const UNSPLASH_REGEX = /^https:\/\/images.unsplash.com\/.+/;
		if (!UNSPLASH_REGEX.test(imageSrc)) {
			throw new InvalidParamsException(
				`Invalid image host. https://images.unsplash.com is only allowed.`
			);
		}
	}
}
